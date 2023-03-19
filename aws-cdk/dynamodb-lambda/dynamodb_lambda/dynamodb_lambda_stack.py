from aws_cdk import (
    aws_lambda,
    aws_dynamodb,
    aws_events,
    aws_events_targets,
    Duration, Stack
)
from constructs import Construct

class DynamodbLambdaStack(Stack):

    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        earthquakes_table = aws_dynamodb.Table(
            self, "Earthquakes",
            partition_key=aws_dynamodb.Attribute(
                name="Location", type=aws_dynamodb.AttributeType.STRING
            ),
            sort_key=aws_dynamodb.Attribute(
                name="Date", type=aws_dynamodb.AttributeType.STRING
            ),
            billing_mode=aws_dynamodb.BillingMode.PAY_PER_REQUEST,
        )

        # create producer lambda function
        producer_lambda = aws_lambda.Function(self, "producer_lambda_function",
                                              runtime=aws_lambda.Runtime.PYTHON_3_6,
                                              handler="lambda_function.lambda_handler",
                                              code=aws_lambda.Code.from_asset("./lambda/producer"))

        producer_lambda.add_environment("TABLE_NAME", earthquakes_table.table_name)

        # grant permission to lambda to write to demo table
        earthquakes_table.grant_write_data(producer_lambda)

        

        

        # create a Cloudwatch Event rule
        one_minute_rule = aws_events.Rule(
            self, "one_minute_rule",
            schedule=aws_events.Schedule.rate(Duration.minutes(1)),
        )

        # Add target to Cloudwatch Event
        one_minute_rule.add_target(aws_events_targets.LambdaFunction(producer_lambda))
        