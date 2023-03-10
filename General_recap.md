### Cheatsheets
## EC2 Cheatsheet

# EC2 General
-Elastic Compute Cloud (EC2) bir bulut bilişim hizmetidir. Amazon EC2 ile AWS bulutunda sanal sunucu instancelarını başlatırsınız.
-İşletim sisteminizi, depolama alanınızı, belleğinizi, ağ veriminizi seçerek EC2'nizi yapılandırın
-EC2, farklı roller için uzmanlaşmış çeşitli Bulut Sunucusu Türlerinde gelir:
-Genel amaçlı(General-purpose): bilgi işlem, bellek ve ağ kaynaklarını dengeleyin
-Compute Optimized: Yüksek performanslı işlemciden yararlanan, hesaplamaya bağlı uygulamalar için ideal
-Memory-Optimized: bellekte büyük veri kümelerini işleyen iş yükleri için hızlı performans
-Accelerated Optimized: donanım hızlandırıcıları veya yardımcı işlemciler
-Storage optimized: yerel depolamadaki çok büyük veri kümelerine yüksek, sıralı okuma ve yazma erişimi
-EC2 bulut sunucunuza AWS tarafından verilen keypair üzerinden SSH ile erişebilirsiniz. Bir anahtar çifti, AWS'nin depoladığı bir genel anahtardan ve sizin sakladığınız bir özel anahtar dosyasından oluşur. Windows AMI'lerinde, bulut sunucunuzda oturum açmak için kullanılan parolayı almak için özel anahtar dosyası gerekir.
-Yerleşim Grupları, iletişim, performans veya dayanıklılık için optimize etmek üzere bulut sunucularınızın mantıksal yerleşimini seçmenize olanak tanır. Yerleşim grupları ücretsizdir
-Kullanıcı verileri(Userdata), bir EC2 bulut sunucusu başlatılırken otomatik olarak çalıştırılacak bir komut dosyası.
-Geçerli instancela ilgili meta veri meta verileri. EC2 instanceına ssh yapıldığında bu meta verilere local endpoint üzerinden erişirsiniz. -Örneğin. curl http://169.254.169.254/latest/meta-data meta verileri instance kimliği, geçerli IP veya genel IP vb. olabilir.
-Kullanıcı verileri(Userdata), instance başlatma sırasında kullanıcı tarafından bir komut dosyası biçiminde sağlanan verilerdir.
-instance kullanıcı verilerine http://169.254.169.254/latest/user-data adresinden ulaşılabilir.
-Kullanıcı verileri ve meta veriler şifrelenmez.
-instance Profilleri: Bu, instance başladığında bir EC2 bulut sunucusuna rol bilgilerini iletmek için kullanabileceğiniz bir IAM rolüdür.
-EC2 compute units (ECU), bir Amazon EC2 bulut sunucusunun integer processing powerın göreli ölçüsünü sağlar.

# EC2 Pricing
-EC2'de İsteğe Bağlı(On-demand), Spot, Rezerve Edilmiş(Reserved) Bulut Sunucuları (RI) ve Tahsis Edilmiş(Dedicated) 4 fiyatlandırma modeli vardır
-Bulut sunucusu ailesinde toplam 20 İsteğe Bağlı bulut sunucusu çalıştırma, 20 Rezerve Edilmiş Bulut Sunucusu satın alma ve bölge başına dinamik spot sınırınıza(dynamic spot limit) göre (varsayılan olarak) Spot Bulut Sunucusu isteme ile sınırlıdır.

İsteğe bağlı (en az taahhüt)
-Düşük maliyetli ve esnek
-taahhüt olmadan sadece saat başına ödeme yapın
-Kullanım senaryosu: kısa süreli, ani, öngörülemeyen iş yükleri, ilk kez uygulamalar. Geliştirme/test için iyi
-İş yüklerinizin kesintiye uğramadığı durumlar için idealdir. Ayrıca otomatik ölçeklendirme(auto-scaling) grupları için idealdir.

Rezerve Edilmiş Bulut Sunucuları (RI) %75'e varan indirim (En iyi uzun vadeli değer)
-Kullanım durumu: kalma durumu veya öngörülebilir kullanım, ayrılmış kapasiteye ihtiyaç duyan uygulamalar için ideal
-Kullanılmayan ayrılmış instanceleri yeniden satabilir (Ayrılmış instance Pazarı)(Reserved Instance Marketplace)
-İndirimli Fiyatlandırma, Dönem x Sınıf Teklifi x Ödeme Seçeneğine dayalıdır
-RI'larınıza ihtiyacınız yoksa, bunları Rezerve Edilmiş Bulut Sunucusu Pazarı'nda satmayı deneyebilirsiniz.
-Ödeme Koşulları: 1 yıl veya 3 yıl
-Ödeme Seçenekleri: Tamamı Peşin, Kısmi Peşin ve Peşin Yok
-Birleştirilmiş Faturalandırma içinde birden fazla hesap arasında paylaşılabilir
-Çalışsa da çalışmasa da faturalandırılır
-AZ'yi aynı bölge içinde değiştirebilir
-Sınıf Teklifleri:
    -Standart: İsteğe bağlı ile karşılaştırıldığında %75'e varan indirimli fiyatlandırma. RI Nitelikleri değiştirilemiyor
    -Dönüştürülebilir(Convertible): İsteğe bağlı ile karşılaştırıldığında %54'e varan indirimli fiyatlandırma. Değer olarak daha büyük veya eşitse RI Niteliklerini değiştirmenize olanak tanır
    -Planlanmış(Scheduled): instanceleri belirli zaman periyotları için ayırırsınız, örn. haftada bir birkaç saat. Tasarruf değişir. Planlanmış = belirli zaman dilimleri için ayrılmıştır, saatlik ücretler, dönem boyunca aylık artışlarla faturalandırılır (1 yıl)

%90'a varan Spot Fiyatlandırma (En Büyük Tasarruf)
-Yedek bilgi işlem kapasitesi isteyin
-Esnek başlangıç ​​ve bitiş saatleri
-Kullanım Durumu: Kesintileri işleyebilir (sunucu rastgele durur ve başlar). kritik olmayan arka plan işleri için ideal. Test için mükemmel.
-Spot Bulut Sunucularını büyük veri, kapsayıcılı iş yükleri, CI/CD, web sunucuları, yüksek performanslı bilgi işlem (HPC) ve diğer test ve geliştirme iş yükleri gibi çeşitli durum bilgisi olmayan, hataya dayanıklı veya esnek uygulamalar için kullanabilirsiniz.
-EC2'nin kapasiteyi geri alması gerektiğinden, bu bulut sunucuları EC2 tarafından geri talep edilmek üzereyken Spot Bulut Sunucuları iki dakikalık bir kesinti bildirimi alır.
Bulut sunucuları herhangi bir zamanda AWS tarafından sonlandırılabilir
-Kesintilerin etkisini azaltmak ve Spot Bulut Sunucularını optimize etmek için uygulamanızı birden çok kapasite havuzunda çeşitlendirin ve çalıştırın.
-Kesintilerin etkisini daha da azaltmak için, Spot Bulut Sunucularını ve Spot Filolarını, kapasite artık mevcut olmadığında bulut sunucularını sonlandırmak yerine, bir kesinti bildirimine durarak veya hazırda bekleterek yanıt verecek şekilde ayarlayabilirsiniz.
-Bulut sunucunuz AWS tarafından sonlandırılırsa kısmi saatlik kullanım için ücret ödemezsiniz
-Bir bulut sunucusunu sonlandırsanız bile, çalıştırdığı her saat için ücretlendirilirsiniz.
-Yeni fiyatlandırma modeli: Spot fiyat, EC2 yedek kapasitesine yönelik arz ve talepteki uzun vadeli eğilimler tarafından belirlenir.

*** 4-instance pricing görseli

<img width="512" alt="instance pricing görseli" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/4-instance%20pricing.JPG">

Özel Barındırma(Dedicated Hosting) (En Pahalı)
-Özel sunucular
-Tam izolasyon
-İsteğe bağlı veya rezerve edilebilir (%70'e varan indirim)
-Öngörülebilir performans
-Kullanım durumu: Yalıtım donanımı garantisine ihtiyacınız olduğunda (kurumsal gereksinimler). Ek olarak, Mevzuata uygunluk veya lisanslama gereksinimleri için iyi.

Tasarruf planı(Saving Plan):
-Tasarruf Planları, Amazon EC2, AWS Fargate ve AWS Lambda kullanımında yüzde 72'ye varan oranda tasarruf etmenize yardımcı olan esnek bir fiyatlandırma modelidir.
-Tasarruf Planları, bir veya üç yıllık bir dönem için tutarlı bir kullanım miktarı ("$/saat" olarak ölçülür) taahhüdü karşılığında size Amazon EC2 kullanımınız, Fargate ve Lambda için daha düşük fiyatlar sağlar.
-Örneğin, "10$/saat" işlem kullanımı taahhüt ederseniz, kullanımınız 10$'a kadar Tasarruf Planları ücretiniz üzerinden ücretlendirilir. Tasarruf Planları taahhüdünüzün dışındaki tüm kullanımlar, normal İsteğe Bağlı fiyatlarınız üzerinden ücretlendirilir.
-İki tür Tasarruf Planı vardır:

    -Compute Tasarruf Planları, İsteğe Bağlı oranlarda yüzde 66'ya varan indirimlerle en fazla esnekliği ve fiyatları sağlar. Bu planlar, bulut sunucusu ailesi (örneğin, M5, C5 vb.), bulut sunucusu boyutları (örneğin, c5.large, c5.xlarge vb.), Bölge (for example, us-east-1, us-east-2, etc.) işletim sistemi (örneğin, Windows, Linux vb.) veya kiracılık (örneğin, Dedicated, default, dedicated host). ne olursa olsun, EC2 bulut sunucusu kullanımınız için otomatik olarak uygulanır.  Fargate ve Lambda kullanımınız için de geçerlidir.

    -EC2 Bulut Sunucusu Tasarruf Planları, seçilen bir AWS Bölgesindeki (örneğin, Virginia'daki M5) belirli bir bulut sunucusu ailesine taahhüt karşılığında İsteğe Bağlı indirimde yüzde 72'ye varan tasarruf sağlar. Bir EC2 Bulut Sunucusu Tasarruf Planı ile bulut sunucusu ailesindeki bulut sunucunuzun boyutunu değiştirebilirsiniz.

-Tasarruf Planı ve Tasarruf Planlarının Karşılaştırılması ile Rezerve Edilmiş instancelar hakkında en son bilgiler için, bkz. Buraya Tıklayın.
https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html

# EC2 AMI
-Amazon Machine Image (AMI), bir bulut sunucusu başlatmak için gereken bilgileri sağlar.
-AMI'ler bölgeye özgüdür, başka bir bölgede bir AMI kullanmanız gerekiyorsa, AMI Kopyala aracılığıyla hedef bölgeye bir AMI kopyalayabilirsiniz.
-Çalışan veya durdurulmuş mevcut bir EC2 bulut sunucusundan bir AMI oluşturabilirsiniz.
-Topluluk AMI'leri, topluluk tarafından sağlanan ücretsiz AMI'lerdir.
-Satıcılar tarafından sağlanan AWS Marketplace ücretsiz veya ücretli abonelik AMI'leri
-AMI'lerin AMI Kimliği vardır. Aynı AMI, örneğin (Amazon Linux 2), her iki AMI ID seçeneğinde de farklılık gösterecektir, örneğin. Farklı bölgelerde mimari seçenekler
-Bir AMI aşağıdaki bilgileri tutar:
    -Instanceın, kök birim için bir şablon (EBS Anlık Görüntüsü-snapshot veya Instance Mağazası şablonu) ör. bir işletim sistemi, bir uygulama sunucusu ve uygulamalar
    -Instanceları başlatmak için AMI'yi hangi AWS hesaplarının kullanabileceğini kontrol eden başlatma izinleri
    -Başlatıldığında instancea eklenecek birimleri belirten bir blok cihaz eşlemesi

# EC2 Networking
IP Adresleri;
-Bir Amazon EC2 bulut sunucusuna atanabilecek üç tür IP adresi vardır:
    -Genel(Public) – genel alt ağlardaki instancelara otomatik olarak atanan ve instance durdurulduğunda/başlatıldığında yeniden atanan bir genel adres.
    -Özel(Private) – Tüm instancelara otomatik olarak atanan private adres.
    -Elastik IP – statik olan bir public adres.
-Instance durdurulduğunda public IPv4 adresleri kaybolur, ancak private adresler (IPv4 ve IPv6) korunur.
-Instanceı yeniden başlatırsanız public IPv4 adresleri korunur.
-Instance durdurulduğunda elastik IP'ler korunur.
-Esnek IP adresleri, instanceler arasında yeniden eşlenebilen (taşınabilen) statik public IP adresleridir.
-Tüm hesaplar, varsayılan olarak bölge başına 5 esnek IP ile sınırlıdır.
-AWS, kullanılmadıklarında esnek IP'ler için ücret alır.
-Elastik IP adresi yalnızca belirli bir bölgede kullanım içindir.
-Public IP adresleri, public alt ağlardaki (VPC) instanceler için atanır.
-EC2-Classic'te bulut sunucuları için her zaman public IP adresleri atanır.
-Esnek IP'ler için DNS kayıtları, bir form doldurularak yapılandırılabilir.
-İkincil IP adreslerinin yeniden atanıp atanamayacağını seçebilirsiniz.
-EC2 bulut sunucuları çalışırken veya durdurulurken IP adresleri atayabilir veya bunlardan IP adreslerini kaldırabilirsiniz.
-Tüm IP adresleri (IPv4 ve IPv6), ayrıldığında veya başka bir instancea yeniden atandığında ağ arayüzüne(network interface) bağlı kalır.

Elastik Ağ Arayüzleri(Elastic Network Interfaces);
-Elastik ağ arabirimi (bu belgede ağ arabirimi olarak anılır), bir sanal ağ kartını temsil eden bir VPC'deki mantıksal ağ bileşenidir.
-Hesabınızda ağ arayüzleri oluşturup yapılandırabilir ve bunları VPC'nizdeki instancelara ekleyebilirsiniz.
-eth0 birincil ağ arabirimidir ve taşınamaz veya ayrılamaz.
-Varsayılan olarak, eth0, başlatıldığında bir EC2 bulut sunucusuyla oluşturulan tek Elastik Ağ Arabirimi'dir (ENI).
-EC2 bulut sunucularına ek arayüzler ekleyebilirsiniz (sayı, bulut sunucusu ailesine/türüne bağlıdır).
-Bir ENI, bir AZ'ye bağlıdır ve ENI'nin hangi alt ağa/AZ'ye eklenmesini istediğinizi belirtebilirsiniz.
-Alt ağ içinde hangi IP adresinin yapılandırılacağını belirtebilir veya otomatik olarak atanmasını sağlayabilirsiniz.
-Launching sırasında yalnızca bir fazladan ENI ekleyebilirsiniz, ancak daha sonra daha fazlası eklenebilir.
-ENI'ler, çalışan instancelara "çalışırken eklenebilir".
-Instance durdurulduğunda ENI'ler "sıcak eklenebilir".
-Instance başlatıldığında ENI'ler "soğuk iliştirilebilir".
-İkinci bir arayüz eklerseniz AWS, eth0'a public bir IP adresi atamaz (Elastik IP eklemeniz gerekir).
-Varsayılan arabirimler, instance sonlandırma ile sonlandırılır.
-Manuel olarak eklenen arabirimler varsayılan olarak sonlandırılmaz.
-Sonlandırma davranışını değiştirebilirsiniz.

Gelişmiş Ağ – Elastik Ağ Bağdaştırıcısı(Enhanced Networking – Elastic Network Adapter) (ENA);
-Gelişmiş ağ iletişimi, daha yüksek bant genişliği, daha yüksek saniye başına paket (PPS) performansı ve sürekli olarak daha düşük instanceler arası gecikme süreleri sağlar.
-Gelişmiş ağ, bir Elastik Ağ Bağdaştırıcısı (ENA) kullanılarak etkinleştirilir.
-Saniyedeki paket oranınız tavana ulaşmış görünüyorsa, VIF sürücüsünün üst eşiklerine büyük olasılıkla ulaşmış olduğunuz için gelişmiş ağa geçmeyi düşünmelisiniz.
-AWS şu anda SR-IOV kullanan gelişmiş ağ özelliklerini desteklemektedir.
-SR-IOV, ağ bağdaştırıcılarına doğrudan erişim sağlar, daha yüksek performans (saniyedeki paket sayısı) ve daha düşük gecikme süresi sağlar.
-Yalnızca belirli instance türleri için kullanılabilir. Uygun sürücülerle bir HVM AMI başlatması gerekir.

Elastik Yapı Adaptörü(Elastic Fabric Adapter) (EFA);
-Elastik Yapı Adaptörü, ek özelliklere sahip bir AWS Elastik Ağ Bağdaştırıcısıdır (ENA).
-Bir EFA hala IP trafiğini işleyebilir ancak aynı zamanda yaygın olarak OS baypası olarak adlandırılan önemli bir erişim modelini de destekler.
-Bu model, uygulamanın (çoğunlukla bazı kullanıcı alanı ara katman yazılımları aracılığıyla) her iletiye işletim sistemini dahil etmek zorunda kalmadan ağ arabirimine erişmesine olanak tanır.
-Elastic Fabric Adapter (EFA), müşterilerin AWS üzerinde yüksek düzeyde düğümler arası(inter-node) iletişim gerektiren uygulamaları geniş ölçekte çalıştırmasını sağlayan Amazon EC2 bulut sunucularına yönelik bir ağ arabirimidir.
-Özel olarak oluşturulmuş işletim sistemi (OS) baypas donanım arabirimi, bu uygulamaları ölçeklendirmek için kritik olan instancelar arası iletişimin performansını artırır.
-EFA ile, Mesaj Geçirme Arayüzü(Message Passing Interface) ve makine öğrenmesi(Machine Learning) (ML) uygulamalarını kullanan Yüksek Performanslı Bilgi İşlem(High-Performance Computing) (HPC) uygulamaları binlerce CPU veya GPU'ya ölçeklenebilir.
-Sonuç olarak, AWS bulutunun isteğe bağlı elastikliği ve esnekliği ile şirket içi HPC kümelerinin uygulama performansını elde edersiniz.
-EFA, desteklenen herhangi bir EC2 bulut sunucusunda ek ücret ödemeden etkinleştirebileceğiniz isteğe bağlı bir EC2 ağ özelliği olarak mevcuttur.

ENI, ENA ve EFA'nın Karşılaştırılması;
ENI ne zaman kullanılır:
Bu, herhangi bir yüksek performans gereksiniminiz olmadığında kullanabileceğiniz temel adaptör türüdür.
Tüm instance türleri ile kullanılabilir.

ENA ne zaman kullanılır:
Daha yüksek bant genişliği ve daha düşük instanceler arası gecikme(low-latency) gerektiren kullanım durumları için iyidir.
Sınırlı instance türleri için desteklenir (yalnızca HVM).

EFA ne zaman kullanılır:
Yüksek Performanslı Bilgi İşlem.(High-Performance Computing) (HPC)
MPI ve ML kullanım durumları.(Message Passing Interface, Machine Learning) (ML)
Sıkıca bağlı uygulamalar.(tightly coupled)
Tüm instance türleri ile kullanılabilir.

# Placement Group
Placement Groups, aşağıdaki yapılandırmalardan birinde mantıksal bir instance gruplamasıdır.

Cluster – instanceleri tek bir AZ'de düşük gecikme süreli bir grupta kümeler:

Cluster Placement Group, tek bir Erişilebilirlik Alanı içindeki instancelarin mantıksal bir gruplamasıdır. Cluster Placement Groupları, düşük ağ gecikmesinden, yüksek ağ aktarım hızından veya her ikisinden yararlanan uygulamalar için ve ağ trafiğinin çoğunluğu gruptaki instanceler arasındaysa önerilir.

Spread – instanceleri temel alınan donanıma yayar (AZ'leri kapsayabilir):

Spread Placement Group, her biri farklı temel donanıma yerleştirilmiş bir instance grubudur. Yayılmış yerleşim grupları, birbirinden ayrı tutulması gereken az sayıda kritik instanceı olan uygulamalar için önerilir.

Partition — her grubu bölüm adı verilen mantıksal bölümlere ayırır:

Amazon EC2, bir Placement Groupdaki her bölümün kendi raf setine sahip olmasını sağlar. Her rafın kendi ağı ve güç kaynağı vardır. Bir Placement Group içindeki hiçbir iki bölüm aynı rafları paylaşmaz, bu da uygulamanızdaki donanım arızasının etkisini izole etmenize olanak tanır. Bölüm Placement Groupları, HDFS, HBase ve Cassandra gibi büyük dağıtılmış ve çoğaltılmış iş yüklerini farklı raflarda dağıtmak için kullanılabilir.

# EC2 Migration
VM Import/Export, VMware, Microsoft, XEN VM'lerini Buluta geçirmek için bir araçtır.

EC2 instancelarını VMware, Microsoft veya XEN VM'lerine dönüştürmek için de kullanılabilir.

Şunlar için desteklenir:

Windows ve Linux.
VMware ESX VMDK'ler ve (yalnızca dışa aktarma için OVA imajlari).
Citrix XEN VHD.
Microsoft Hyper-V VHD.
Yalnızca API veya CLI aracılığıyla kullanılabilir (konsol değil).

VMDK veya VHD imajları oluşturmadan önce VM'yi durdurun.

AWS, vCenter için bir VM bağlayıcı eklentisine sahiptir:

VM'lerin S3'e taşınmasına izin verir.
Daha sonra bir EC2 AMI'ye dönüşür.
İlerleme vCenter'da izlenebilir.

# EC2 Autoscaling
Bir Autoscaling Grubu (ASG), ölçeklendirme ve yönetim için gruplandırılmış bir EC2 bulut sunucusu koleksiyonudur.
Autoscaling, bölgeye özgü bir hizmettir.
Autoscaling, aynı AWS bölgesinde birden çok AZ'ye yayılabilir.
Autoscaling için ek maliyet yoktur, yalnızca sağlanan kaynaklar (EC2 bulut sunucuları) için ödeme yaparsınız.
Auto Scaling, ELB, CloudWatch ve CloudTrail ile çalışır.
Ölçek büyütme, bir örneğin boyutunu artırdığınızda gerçekleşir (örneğin, başlatma yapılandırmasını büyük boyutla güncelleme)
ASG'nin boyutu, Min, Maks ve İstenen Kapasiteye dayalıdır

-Hedef Ölçeklendirme politikası(Target Scaling policy), metrik için bir hedef değerin ne zaman ihlal edildiğine göre ölçeklenir, ör. Ortalama CPU kullanımı %75'i aşıyor
Instanceleri başlatmak veya sonlandırmak için bir ölçeklendirme eylemi olayı tarafından tetiklenir.

-Adımlı Basit Ölçeklendirme ilkesi(Simple Scaling policy), basit ölçeklendirme ilkesinin yeni sürümüdür ve yükseltme alarmı değerlerine göre adımlar oluşturmanıza olanak tanır.

-Planlanmış Eylem'de(In scheduled Action), Autoscalingyi tetiklemek için belirli bir olay veya zaman belirlersiniz.

Arzu kapasitesi(Desire capacity), ideal olarak kaç EC2 bulut sunucusu çalıştırmak istediğinizdir
Bir ASG, her zaman minimum kapasiteyi karşılamak için instanceleri başlatır
Durum denetimi(Health check), ideal olarak çalıştırmak istediğiniz bir örneğin mevcut durumunu belirler
Bir ASG, her zaman minimum kapasiteyi karşılamak için instanceleri başlatır
Bekleme Süresi(Cooldown Period): Bekleme süresi, Auto Scaling grubunuz için, önceki ölçeklendirme etkinliği yürürlüğe girmeden önce ek bulut sunucularını başlatmamasını veya sonlandırmamasını sağlamaya yardımcı olan yapılandırılabilir bir ayardır. Autoscaling grubunuzu oluşturduğunuzda, 300 saniye olan varsayılan bekleme süresi uygulanır.
Sağlık kontrolleri(Health check), bir ELB veya EC2 bulut sunucusuna karşı çalıştırılabilir
ELB'ler aynı bölgede olmalıdır.
Bir Autoscaling yeni bir instance başlattığında, instancelar için yapılandırma değerlerini tutan bir Başlatma yapılandırması(Launch configuration) kullanır. Ör. AMI, instance türü, Rol
Başlatma Yapılandırmaları(Launch configuration) düzenlenemez ve klonlanmalı veya yeni bir tane oluşturulmalıdır
Başlatma Yapılandırmaları(Launch configuration), Autoscaling ayarları düzenlenerek manuel olarak güncellenmelidir

Dört ölçeklendirme seçeneği vardır:
    -Bakım(Maintain) – belirli veya minimum sayıda örneği çalışır durumda tutun.
    -Manuel– maksimum, minimum veya belirli sayıda instance kullanın.
    -Zamanlanmış(Scheduled)  - bir zamanlamaya göre instance sayısını artırın veya azaltın.
    -Dinamik – gerçek zamanlı sistem ölçümlerine dayalı ölçeklendirme (ör. CloudWatch ölçümleri).
Ayrıca bir Amazon Simple Queue Service (SQS) kuyruğuna göre ölçeklenebilir.
    -Auto Scaling grubundaki EC2 bulut sunucusu başına kuyruktaki mesaj sayısını ölçen Amazon CloudWatch'a gönderilen özel bir ölçüm kullanır.
    -Ardından, Autoscaling grubunuzu özel metriğe ve belirlenmiş bir hedef değere göre ölçeklenecek şekilde yapılandıran bir hedef izleme ilkesi(target tracking policy) kullanın. CloudWatch alarmları, ölçeklendirme ilkesini çağırır.
    -Yalnızca kuyruktaki ileti sayısını değil, alınabilecek sayıyı da izlemek için özel bir "instance başına birikim"(backlog per instance) metriği kullanın.
    -SQS Metrik “ApproximateNumberOfMessages”ı temel alabilir.

# EC2 Elastic Load Balance (ELB)
-Üç Elastic Load Balancer (ELB) vardır: Network Load Balancer (NLB), Application Load Balancer (ALB) ve Classic Load Balancer (CLB)
-ALB'de en az 2 AZ olmalıdır
-NLB için yalnızca bir alt ağ belirtilmelidir (en az 2 eklenmesi önerilir)
-CLB için, "Gelişmiş VPC yapılandırmasını etkinleştir"(Enable advanced VPC configuration) seçeneğini etkinleştirmedikçe herhangi bir alt ağ belirtmeniz gerekmez; bu durumda iki tane belirtmeniz gerekir.
-ELB'ler internete yönelik veya yalnızca dahili olabilir
-Güvenlik grupları, ön uç(frontrnd) dinleyiciye ulaşabilen bağlantı noktalarını(port) ve protokolleri kontrol eder
-Hedef Gruplar(Target Groups): Hedef gruplar, mantıksal bir hedef gruplamasıdır (EC2 instanceleri veya ECS)
-Tek bir hedef, birden çok hedef grupta olabilir
-Bir hedef grup yalnızca bir Load Balancer ile ilişkilendirilebilir
-ELB bölgeler arası gidemez. Bölge başına oluşturmanız gerekir
-Application Load Balancer (ALB), trafiği yönlendirmek için dinleyicilere, Kurallara ve Hedef Gruplara sahiptir
    İstek-request düzeyinde çalışır
    İsteğin içeriğine göre rotalar (katman7)
    Yol tabanlı yönlendirmeyi(path-based routing), ana bilgisayar tabanlı yönlendirmeyi(host-based routing), sorgu dizesi parametresi tabanlı yönlendirmeyi(query string parametry based routing) ve kaynak IP tabanlı yönlendirmeyi(source IP based routing) destekler
    Hedef olarak IP adresini, Lambda işlevlerini ve kapsayıcıları(containers) destekler
-Network Load Balancer (NLB), trafiği yönlendirmek için dinleyicileri ve Hedef Grupları kullanır
    Bağlantı düzeyinde çalışır
    IP protokol verilerine (katman4) dayalı olarak bağlantıları yönlendirir
    Ultra yüksek performans, düşük gecikme süresi ve geniş ölçekte TLS boşaltma sunar
    Statik IP/Elastik IP'ye sahip olabilir
    Hedef olarak UDP ve statik IP adreslerini destekler
-Classic Load Balancer (CLB) dinleyicileri kullanır ve EC2 bulut sunucuları doğrudan CLB'ye hedef olarak kaydedilir
    Eski nesil; yeni uygulamalar için önerilmez
    Katman 4 ve Katman 7'de yönlendirme gerçekleştirir
    EC2-Classic'te çalışan mevcut eski uygulamalar için kullanın
-Application Load Balancer, HTTP ve HTTPS trafiği içindir ve adı Web Uygulamaları için iyi olduğunu ima eder
-NLB, TCP/UDP içindir, örneğin iyi bir yüksek ağ verimidir. Video oyunları
-CLB eskidir ve ALB veya NLB kullanılması önerilir
-ELB'den geçen gelen trafiğin orijinal IP'sini almak için X-forwarded-for (XFF) kullanın
-Web Uygulaması Güvenlik Duvarı(Web Application Firewall'nı (WAF) ALB'ye ekleyebilir, ancak NLB veya CLB'ye ekleyemezsiniz.
-Amazon Certification Manager SSL'yi SSL için ELB'lerden herhangi birine ekleyebilirsiniz
-ALB, alt etki alanı başlığına(subdomain header), yola(path) ve diğer HTTP veya HTTPS bilgilerine göre yönlendirme yapabileceğiniz gelişmiş İstek Yönlendirme(Request Routing rules) kurallarına sahiptir.
-Yapışkan oturum(Sticky session) CLB veya ALB için etkinleştirilebilir ve oturum Çerez(cookie) aracılığıyla hatırlanır

# Cross-Zone Load Balancing
Cross-Zone Load Balancing ile Classic Load Balancer'ınız için her bir Load Balancer düğümü, tüm etkin Erişilebilirlik Alanlarında kayıtlı instanceler arasında istekleri eşit olarak dağıtır. Cross-Zone Load Balancing devre dışı bırakılırsa, her bir Load Balancer düğümü, istekleri yalnızca kendi Erişilebilirlik Alanındaki kayıtlı instanceler arasında eşit olarak dağıtır.

-Cross-Zone Load Balancing, varsayılan olarak CLB ve ALB için etkinleştirilmiştir, ancak NLB için etkinleştirilmemiştir (konsol aracılığıyla oluşturulduğunda).
-CLB, CLI veya API'den oluşturulmuşsa, Cross-Zone Load Balancing varsayılan olarak ETKİN DEĞİLDİR.
-CLB ve NLB'de Cross-Zone Load Balancingyi istediğiniz zaman etkinleştirebilir veya devre dışı bırakabilirsiniz.
-ALB için, Cross-Zone Load Balancing her zaman açıktır ve devre dışı bırakılamaz.
-Cross-Zone Load Balancing etkinleştirildiğinde, her bir Load Balancer düğümü, tüm etkin Erişilebilirlik Alanlarında kayıtlı hedefler arasında trafiği dağıtır.
-Cross-Zone Load Balancing devre dışı bırakıldığında, her Load Balancer düğümü trafiği yalnızca Erişilebilirlik Alanındaki kayıtlı hedefler arasında dağıtır.
-Bağlantı boşaltma(Connection draining) varsayılan olarak etkindir ve mevcut bağlantıların temiz bir şekilde kapanması için bir süre sağlar.
-Bağlantı boşaltma(Connection draining) işlemi sırasında bir CLB, "InService: Instance deregistration currently in progress" durumunda olacaktır.

## Simple Storage Service (S3)
-Simple Storage Service (S3) nesne tabanlı depolama. Temel depolama altyapısı hakkında endişelenmeden sınırsız miktarda veri depolayın
-S3 kalıcı, son derece dayanıklı bir veri deposudur.
-Kullanım Durumları
    Yedekleme ve Depolama(Backup and Storage) – Başkaları için veri yedekleme ve depolama hizmetleri sağlayın.
    Uygulama Barındırma(Application Hosting) – Web uygulamalarını dağıtan, kuran ve yöneten hizmetler sağlayın.
    Medya Barındırma(Media Hosting) – Video, fotoğraf veya müzik yüklemelerini ve indirmelerini barındıran yedekli, ölçeklenebilir ve yüksek oranda kullanılabilir bir altyapı oluşturun.
    Yazılım Teslimatı(Software Delivery) – Müşterilerin indirebileceği yazılım uygulamalarınızı barındırın.
    Statik Web Sitesi(Static Website) – statik bir web sitesini bir S3 bucketsından çalışacak şekilde yapılandırabilirsiniz.
-S3 evrensel bir ad alanıdır, bu nedenle adlar genel olarak benzersiz olmalıdır.
-S3 bucketsı bölgeye özgüdür.
-S3, %99,99 kullanılabilirlik ve 11' 9 dayanıklılık sağlamak için verileri en az 3 AZ'de çoğaltır
-Nesne verilerinizi içerir (dosya gibidirler)
-Nesne, 0 bayttan 5 Terabayta kadar herhangi bir boyutta olabilir
-Bucketlar nesneler içerir. bucket, sırayla nesneler içerebilen klasörler de içerebilir.
-Bucket adları tüm AWS hesaplarında benzersizdir. Alan adı gibi.
-S3'e başarıyla bir dosya yüklediğinizde, bir HTTP 200 kodu alacaksınız
-Yaşam Döngüsü Yönetimi(Lifecycle Management) nesneleri depolama sınıfları arasında taşınabilir veya nesneler bir zamanlamaya göre otomatik olarak silinebilir
-Sürüm oluşturma(Versioning), nesnelere sürüm kimliği veriyor. Nesneler yüklendiğinde eskileri tutulur. Herhangi bir nesne sürümüne erişebilirsiniz. Bir nesneyi sildiğinizde, önceki nesne geri yüklenir. Sürüm oluşturma açıldığında kapatılamaz, yalnızca askıya alınır.
-MFA silme, bir nesneyi silmek için bir MFA belirteci(tokeni) gerektirmek üzere DELETE işlemlerini zorunlu kılar. Kullanmak için sürüm oluşturmanın açık olması gerekir. Yalnızca AWS CLI'den MFA silmeyi açabilir. Kök hesabın yalnızca nesneleri silmesine izin verilir.
-Tüm yeni bucketler varsayılan olarak privatedır
-Sunucu Erişim Günlüğü(Server Access Logging), bucketinize yapılan istek için ayrıntılı kayıtlar sağlar. Varsayılan olarak S3, sunucu erişim günlüklerini toplamaz.
-Statik Web Sitesi Barındırma(Static Website Hosting), Amazon S3'te statik bir web sitesi barındırmanıza olanak tanır.
-Erişim kontrol Listesi(Access control List) (ACL), bucketlara ve nesnelere erişimi yönetmenize olanak tanır. ACL, hangi AWS hesaplarına (yetki alanlar) veya önceden tanımlanmış S3 gruplarına erişim izni verileceğini ve erişim türünü tanımlar.
-ACL'ler, eylemler içeren nesnelere ve bucketlere erişim izni verdiğiniz eski yöntemdir (kullanımdan kaldırılmamıştır).
-Erişim denetimi, kendisine karşı yapılan tüm istekler için erişim günlüğü kayıtları oluşturmak üzere bir Amazon S3 bucketı yapılandırılarak yapılandırılabilir.
-Bucket İlkeleri(Bucket Policies), karmaşık denetim erişimi yazmanıza izin veren JSON belgeleridir.
-Transit yükleme dosyalarında güvenlik SSL üzerinden yapılır
-SSE, Sunucu Tarafı Şifreleme(Server Side Encryption) anlamına gelir. S3, SSE için 3 seçeneğe sahiptir
-SSE-AES: S3 anahtarı yönetir,
    Her nesne benzersiz bir anahtarla şifrelenir.
    Şifreleme anahtarı, bir ana anahtarla şifrelenir.
    AWS, ana anahtarı düzenli olarak döndürür.
    AES 256 algoritmasını kullanır.
-SSE-KMS: AWS KMS aracılığıyla zarf şifreleme ve anahtarları siz yönetin
    KMS, şifrelemek için Müşteri Ana Anahtarlarını (CMK'ler) kullanır.
    Otomatik olarak oluşturulan CMK anahtarını kullanabilir.
    VEYA kendi anahtarınızı seçebilirsiniz (anahtarların yönetimi için size kontrol sağlar).
    Zarf anahtarı, anahtarlarınızı korur.
    Ücretli.
-SSE-C: Müşteri tarafından sağlanan anahtar (anahtarları siz yönetirsiniz)
    İstemci anahtarları yönetir, S3 şifrelemeyi yönetir.
    AWS, şifreleme anahtarlarını saklamaz.
    Anahtarlar kaybolursa verilerin şifresi çözülemez.
-İstemci Tarafı Şifreleme(Client-Side Encryption): İstemciler, S3'e yüklemeden önce kendi dosyalarını şifrelemelidir.
-Bölgeler Arası Çoğaltma(Cross-Region Replication) (CRR), daha fazla dayanıklılık için dosyaları bölgeler arasında çoğaltmanıza olanak tanır. Kaynak ve hedef buckette sürüm oluşturmayı etkinleştirmiş olmanız gerekir. CRR'nin başka bir AWS Hesabındaki bucketya çoğaltılmasını sağlayabilirsiniz
-Transfer Hızlandırma(Transfer Acceleration), dünyanın her yerinden daha hızlı ve güvenli yüklemeler sağlar. Veriler, ayrı bir url aracılığıyla bir Edge Locationa yüklenir. Veriler daha sonra AWS omurga ağı aracılığıyla S3 klasörünüze taşınır. Aktarım Hızlandırma, Amazon CloudFront'un küresel olarak dağıtılan AWS Edge Locationlardan yararlanır.
-Önceden imzalanmış URL'ler(Pre signed URLs), AWS CLI ve SDK aracılığıyla oluşturulan bir URL'dir. Nesne verilerini yazmak veya indirmek için geçici erişim sağlar. Önceden imzalanmış URL'ler, özel nesnelere erişmek için yaygın olarak kullanılır.
-Nesne Etiketleri(Object Tags): S3 nesne etiketleri, nesnenin ömrü boyunca herhangi bir zamanda oluşturulabilen, güncellenebilen veya silinebilen S3 nesnelerine uygulanan anahtar/değer çiftleridir.
-Olaylar(Events): Amazon S3 olay bildirimleri, S3'te depolanan nesnelerinizdeki değişikliklere yanıt olarak iş akışları çalıştırmanıza, uyarılar göndermenize veya başka eylemler gerçekleştirmenize olanak tanır. olaylar meydana geldiğinde bir hedefe bir bildirim mesajı göndermek için belirli S3 bucket olaylarını etkinleştirebilirsiniz. SNS, SQS, Lambda'yı tetikleyebilir.

-S3'ün 6 Farklı Depolama Sınıfı Vardır
    -Standart, %99,99 kullanılabilirlik, 11 9’ dayanıklılık. En az üç AZ'de çoğaltılır
    -Intelligent Tiering, nesne kullanımınızı analiz etmek ve uygun depolama sınıfını belirlemek için ML kullanır. Veriler, herhangi bir performans etkisi veya ek yük olmaksızın en uygun maliyetli erişim katmanına taşınır
    -Standart Infrequent Accessed (IA), dosyalara ayda bir kereden daha az erişirseniz daha ucuzdur. Ek bir geri alma ücreti uygulanır. Standarttan %50 daha az (azaltılmış kullanılabilirlik)
    -One Zone IA, nesneler yalnızca bir AZ'de bulunur. Kullanılabilirlik (%99,5'tir). ancak Standart IA'dan %20 daha ucuzdur (Dayanıklılığı azaltır). Veriler yok edilebilir. Bir geri alma ücreti uygulanır.
    -Uzun süreli soğuk depolama için buzul(Glacier). Verilerin alınması dakikalar ve saatler sürebilir ancak bu çok ucuz bir depolamadır.
    -Glacier Deep Archive, en düşük maliyetli depolama sınıfıdır. Veri alma süresi 12 saattir.

-S3 Glacier; Amazon S3 Glacier'ın depolama sınıfları, S3 depolama sınıflarında bulunan diğer seçeneğe göre daha ucuzdur ve bunun arkasındaki en büyük neden, bu durumda müşteri tarafından anında veri erişiminin verilmesidir. Sonuç olarak, Glacier durumunda, S3 nesnelerinin bir saniyeden kısa gecikmeyle alınması yerine veri alımı sadece birkaç dakika veya saat sürer.

Geri alma zamanı için kullanıcılara klasik S3 Glacier'ın depolama sınıfına göre 3 seçenek sunulur. Bunlar:
    Toplu(Bulk): toplu istekleri almak en yavaş seçenek olarak duruyor ve verilere yaklaşık 5-12 saat sonra erişilebilir. Hemen talep edilmeyen büyük miktarlardaki verileri geri yüklemek amacıyla, en uygun seçenek olarak duruyor. 
    Standart: Müşteriler, standart alma seçeneği ile verilere 3-5 saat aralığında erişir.
    Hızlandırılmış(Expedited): verilere erişim, birkaç dakika içinde hızlandırılmış erişimle mümkündür. Bu seçenek en hızlı olanıdır, ancak aynı zamanda pahalıdır.

Geri alma zamanı için S3 Glacier Deep Archive durumunda yalnızca bir seçenek vardır. S3 Glacier Deep Archive'dan veri almak için yaklaşık 12-48 saat gerekir. Bunun için henüz maliyet duyuruları yapılmadı.

-Minimum Depolama Süresi
S3 Glacier'ın tasarımı, uzun süreli depolamaya yöneliktir ve bu nedenle, Glacier'de depolandıktan sonra verilerin müşteriler tarafından hızlı bir şekilde silinmesi durumunda kullanıcılar AWS tarafından ücretlendirilir.

Klasik S3 Glacier için minimum saklama süresi 90 gündür. Bir nesne, S3 Glacier'a yerleştirildikten sonraki 90 günlük süreden önce silinirse, 0,012 USD/GB olan orantılı bir ücret alınır. Nesnenin yerleştirilmesinden 45 gün sonra silinmesi durumunda, alınan ücret, orantılı ücretin yarısıdır.

S3 Glacier Deep Archive durumunda minimum depolama süresi 180 gündür ve fiyatlandırma yapısı S3 Glacier ile aynıdır.

*** 5-Glacier Comparison görseli

<img width="612" alt="Glacier Comparison görseli" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/5-Glacier%20Comparison.JPG">

## EBS
# EBS General
-Elastik Blok Depolama (EBS), sanal bir sabit disktir. Snapshot, o diskin belirli bir zamandaki kopyasıdır
-EBS'de volumeler var. Snapshot S3'te var
-Snapshotler artımlı(incremental), yalnızca son Snapshot S3'e taşındığından beri yapılır.
-EC2 instanceının İlk Snapshotlerinin oluşturulması sonraki Snapshotlere göre daha uzun sürecektir
-Bir root volumeün Snapshotsü alınırsa, Snapshot alınmadan önce EC2 instanceı durdurulmalıdır.
-instance hala çalışırken Snapshot alabilirsiniz
-AMI'leri volumelerden veya Snapshotlerdan oluşturabilirsiniz.
-EBS volumeleri dayanıklıdır, tek bir EC2 bulut sunucusuna ekleyebileceğiniz blok düzeyinde bir depolama aygıtıdır.
-EBS volumelerinin bir instancea eklenmesi gerekmez.
-Bir instancea birden çok EBS volumeü ekleyebilirsiniz
-Bir EBS volumeünü birden çok instancee ekleyemezsiniz (bunun yerine Elastic File Store kullanın --> EFS ve EBS arasındaki en büyük farklar). (İstisna: Aynı Erişilebilirlik Alanında 16 Nitro tabanlı bulut sunucusu)
-Volume boyutları ve türleri kesinti olmaksızın yükseltilebilir (manyetik standart hariç).
-Volumeler her zaman EC2 bulut sunucusuyla aynı AZ'de bulunur.
-Instance depolama volumeleri, bir ana makineye fiziksel olarak bağlı bir diskte bulunan geçici bir depolama türüdür.
-Snapshotlar, bir instanceın belirli bir zamandaki durumunu yakalar. bir sistemi yeni bir AZ'ye veya bölgeye taşımak için kullanılabilir.
-Snapshotler Amazon S3'te saklanır.
-Farklı boyutlardaki (Snapshot alınırken yapılandırılan) Snapshotlerı geri yükleyerek volumeleri yeniden boyutlandırabilirsiniz.
-Instance depolama volumeleri (geçici) durdurulamaz. Ana bilgisayar başarısız olursa verilerinizi kaybettiniz
-EBS destekli instancelar durdurulabilir ve herhangi bir veri kaybetmezsiniz
-Varsayılan olarak kök(root) volumeler sonlandırmada silinir
-EBS volumelerinde sonlandırma koruması olabilir (sonlandırma sırasında volumeü silmeyin)
-Bir EC2 bulut sunucusunun hem önyüklemesini hem de veri volumelerini şifreleyebilirsiniz. Şifrelenmiş bir EBS volumeü oluşturup bunu desteklenen bir bulut sunucusu tipine eklediğinizde, aşağıdaki veri türleri şifrelenir:
    -Volume içinde duran veriler.
    -Volume ve instance arasında hareket eden tüm veriler.
    -Volumeden oluşturulan tüm Snapshotler.
    -Bu Snapshotlerden oluşturulan tüm volumeler.
-Şifrelenmiş bir Snapshotyü paylaşamazsınız.
-Şifrelenmemiş Snapshotler diğer AWS hesaplarıyla paylaşılabilir veya herkese açık hale getirilebilir
-AZ'ler arasında volumeleri taşımak için bir Snapshot oluşturun, ardından Snapshotden başka bir AZ'de bir volume oluşturun (boyut ve tür değiştirilebilir).

# EBS Volume Types
Solid-state drives (SSD):
*** 6-SSD Görseli

<img width="612" alt="SSD Görseli" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/6-SSD.JPG">

Hard disk drives (HDD):
*** 7-HDD Görseli

<img width="612" alt="HDD Görseli" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/7-HDD.JPG">

Instance Store
-Instance Store, instanceınız için geçici (kalıcı olmayan) blok düzeyinde depolama sağlar.
-Bu, kalıcı depolama sağlayan ancak aynı zamanda kök(root) veya ek birim olabilen bir blok depolama hizmeti olan EBS'den farklıdır.
-Instance Store depolaması, ana bilgisayara fiziksel olarak bağlı disklerde bulunur.
-Instance Store, arabellekler, önbellekler, çalışma verileri ve diğer geçici içerikler gibi sık sık değişen bilgilerin geçici olarak depolanması veya yük dengeli(load-balanced) bir web sunucusu havuzu gibi bir instance filosunda çoğaltılan veriler için idealdir.
-Bir instance için instance depolama birimlerini yalnızca başlattığınızda belirtebilirsiniz.
-Bir Instance Store birimini bir instancetan ayıramaz ve farklı bir instancea ekleyemezsiniz.
-Instance türü, kullanılabilir Instance Storeun boyutunu ve Instance Store birimleri için kullanılan donanımın türünü belirler.
-Instance Store hacimleri, instanceın kullanım maliyetinin bir parçası olarak dahil edilir.
-Bu, çok düşük gecikmeli depolamaya ihtiyacınız olduğunda iyi bir seçenektir, ancak bulut sunucusu sona erdiğinde verilerin kalıcı olması gerekmediği durumlarda kullanabilir veya hataya dayanıklı mimarilerden yararlanabilirsiniz.

SINAV İPUCU: Instance Store çok yüksek performans ve düşük gecikme süresi sunar. Bir instanceı kaybetmeyi göze alabildiğiniz sürece, yani verilerinizi yedekliyorsanız, bunlar yüksek performans/düşük gecikme gereksinimleri için iyi bir çözüm olabilir. Yüksek G/Ç(I/O)'ye ihtiyaç duyan dağıtılmış(distributed) veya çoğaltılmış(replicated) veritabanlarından bahseden sorulara dikkat edin. Ayrıca, bulut sunucusu depolarının maliyetinin bulut sunucusu ücretlerine dahil edildiğini unutmayın, böylece EBS tarafından Sağlanan IOPS'den daha uygun maliyetli olabilir.

## Elastic File Storage (EFS)
-EFS, Amazon Cloud'da dosya depolamayı ayarlamayı ve ölçeklendirmeyi kolaylaştıran tam olarak yönetilen(fully-managed) bir hizmettir.
-Elastic File System (EFS), Network File System (NFS) protokolünü destekler
-Bir veya daha fazla AZ'de bağlama noktalarını yapılandırabilir.
-Aylık GB depolama alanı ödersiniz
-EFS, petabayt boyutundaki depolamaya kadar ölçeklenebilir
-Hacimler(volumes), depolanan mevcut verileri karşılamak için küçülecek ve büyüyecektir (elastik)
-NFS üzerinden binlerce eşzamanlı bağlantıyı destekleyebilir
-Verileriniz bir bölgedeki birden çok AZ'de depolanır
-Birden fazla EC2 bulut sunucusu, tek bir EFS'ye bağlanabilir (hepsi aynı VPC'de olduğu sürece). birden çok AZ'den 1 ila 1000'lerce EC2 bulut sunucusunu aynı anda bağlayabilir.
-VPC'nizin herhangi bir yerinden bağlanabilmeniz için tüm VPC alt ağlarınızda mount noktaları oluşturur
-Yazma Sonrası Okuma tutarlılığı(Read After Write consistency) sağlar
-EFS, YALNIZCA Doğrudan Bağlantı(Direct Connect) veya bir VPN bağlantısı kullanılıyorsa şirket içi(on-premises) sistemlerden monte edilebilir.
-Büyük veri ve analitik, medya işleme iş akışları, içerik yönetimi, web hizmeti, ev dizinleri vb. için uygundur.
-İki performans modu vardır:
    -“Genel Amaçlı-General Purpose” performans modu çoğu dosya sistemi için uygundur.
    "Max I/O" performans modu, dosya sistemine onlarca, yüzlerce veya binlerce EC2 instanceının eriştiği uygulamalar için optimize edilmiştir.
-EFS, bekleyen(data at rest) ve aktarım halindeki(in transit) verileri şifreleme yeteneği sunar. Şifreleme anahtarları, AWS Key Management Service (KMS) tarafından yönetilir.
-EFS File Sync, mevcut dosya sistemlerini Amazon EFS ile güvenli bir şekilde eşitlemenin hızlı ve basit bir yolunu sunar.
-EFS File Sync, dosyaları ve dizinleri AWS Konsolunda basit kurulum ve yönetimle standart Linux kopyalama araçlarından 5 kata kadar daha hızlı bir şekilde Amazon EFS'ye kopyalar.
-FS File Sync, dosyaları internet veya bir AWS Direct Connect bağlantısı üzerinden güvenli ve verimli bir şekilde kopyalar.
-Amazon EFS, mümkün olan en yüksek aktarım hızını gerektiren yüksek düzeyde paralelleştirilmiş, ölçeği genişletilebilir iş yüklerinden tek iş parçacıklı, gecikmeye duyarlı iş yüklerine kadar geniş bir kullanım senaryoları yelpazesini desteklemek için çok uygundur. Kaldır ve değiştir(lift-and-shift) kurumsal uygulamalar, büyük veri analitiği, web hizmeti ve içerik yönetimi, uygulama geliştirme ve test etme, medya ve eğlence iş akışları, veritabanı yedeklemeleri ve kapsayıcı depolama gibi durumları kullanın.

## Storage Gateway
*** 8-Storage Gateway görseli

<img width="612" alt="Storage Gateway görseli" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/8-Storage%20Gateway.JPG">

-AWS Storage Gateway hizmeti, şirket içi ortamlar ve AWS Cloud arasında hibrit depolama sağlar.
-Amazon bulut depolama hizmetlerinde verileri güvenli ve dayanıklı bir şekilde depolarken, şirket içinde sık erişilen verileri önbelleğe alarak düşük gecikmeli performans sağlar.
-AWS S3 ve Glacier tarafından desteklenen yerel depolama kaynakları sağlar.
-Verileri AWS ile senkronize etmek için genellikle olağanüstü durum kurtarma hazırlığında kullanılır.
-Bulut geçişlerinde kullanışlıdır.
-Üç Storage Gateway vardır: File Gateway, Volume Getaway, Tape Gateway
-File Gateway, S3'ün NFS veya SMB kullanarak yerel bir dosya sistemi olarak hareket etmesini sağlar, yerel sabit sürücünüzü S3'e genişletir
-Volume Gateway, yedeklemeler için kullanılır ve iki türü vardır: Depolanmış ve Önbelleğe Alınmış(Stored and Cached)
-Stored Volume Gateway, tüm veri kümesi yerinde depolanır ve eşzamansız olarak S3'e (EBS anlık snapshots) yedeklenir. Snapshots artımlı ve sıkıştırılmıştır.
-Depolanan(Stored) birimlerin boyutu 1 GB ile 16 TB arasındadır
-Önbelleğe Alınmış(Cached) Birim Ağ Geçidi, şirket içinde sık kullanılan dosyaları önbelleğe alır, birincil veriler S3'te depolanır
-Önbelleğe Alınmış Birimlerin boyutu 1 GB ile 32 GB arasındadır
-Tape Gateway, uzun arşiv depolaması için virtual tapesi S3 Glacier'a yedekler

## Amazon FSx
-Amazon FSx, Windows tabanlı depolama, yüksek performanslı bilgi işlem (HPC), makine öğrenimi ve elektronik tasarım otomasyonu (EDA) gibi iş yükleri için özellik setleriyle üçüncü taraf dosya sistemlerinin yerel uyumluluğunu sağlar.
-Amazon FSx, donanım sağlama, yazılım yapılandırması, yama uygulama ve yedeklemeler gibi zaman alan yönetim görevlerini otomatik hale getirdiği için dosya sunucularını ve depolamayı yönetme konusunda endişelenmenize gerek yok.
-Amazon FSx, dosya sistemlerini bulutta yerel AWS hizmetleriyle entegre ederek onları daha geniş bir iş yükü kümesi için daha da kullanışlı hale getirir.
-Amazon FSx, aralarından seçim yapabileceğiniz iki dosya sistemi sunar:
    -Windows tabanlı uygulamalar için Windows Dosya Sunucusu için Amazon FSx
    -Yoğun işlem gerektiren iş yükleri için Amazon FSx for Lustre.
-Windows Dosya Sunucusu için Amazon FSx(Amazon FSx for Windows File Server), paylaşılan dosya depolaması gerektiren Windows tabanlı uygulamalarınızı kolayca AWS'ye taşıyabilmeniz için tam olarak yönetilen bir yerel Microsoft Windows dosya sistemi sağlar. Windows Server üzerine kurulu Amazon FSx, SMB protokolü, Windows NTFS ve Microsoft Active Directory (AD) entegrasyonu için tam destek dahil olmak üzere Microsoft uygulamalarınızın güvendiği uyumluluk ve özellikleri sağlar. Sınavda Windows dosya sunucusunu(Windows file server) okuyorsanız, Windows Dosya sunucusu için Amazon FSx'i düşünün.
-Amazon FSx for Lustre, makine öğrenimi, yüksek performanslı bilgi işlem (HPC), video işleme, finansal modelleme ve elektronik tasarım otomasyonu (EDA) gibi iş yüklerinin hızlı işlenmesi için optimize edilmiş yüksek performanslı bir dosya sistemidir.

## Cloudformation
-Kaynakların sağlanmasını otomatikleştirmeniz istendiğinde Cloudformation düşünün
-Kod olarak altyapı(infrastructure as code) (IaC) denilince Cloudformation düşünün.
-Cloudformation, JSON veya YAML'de yazılabilir
-Elastic Beanstalk, uygulamaları EC2'ye (PaaS) dağıtmaya daha fazla odaklanmıştır.
-Cloudformation bir hatayla karşılaştığında ROLLBACK_IN_PROGRESS ile geri dönecek
-51.200 bayttan (0,05 MB) büyük Cloudformation şablonları, doğrudan yüklenemeyecek kadar büyüktür ve bir S3 paketi aracılığıyla Cloudformation'a aktarılmalıdır.
-NestedStacks, Cloudformation şablonunuzu daha büyük şablonlar halinde oluşturulabilecek daha küçük yeniden kullanılabilir şablonlara bölmenize yardımcı olur
-Kaynaklar altında en az bir kaynak: Bir Cloudformation şablonunun geçerli olması için tanımlanmalıdır
-Meta veriler(Metadata): şablonunuz hakkında ek bilgiler
-Açıklama(Description): şablonun ne yapması gerektiğinin açıklaması
-Parametreler(Parameters), kullanıcı girdilerini şablonlara nasıl alacağınızdır.
-Çıktılar(Outputs), diğer yığınlara içe aktarmak için kullanabileceğiniz değerlerdir.
-Eşlemeler(Mappings): Anahtarları değerlerle eşleyin, tıpkı bir arama tablosu gibi
-Kaynaklar(Resources) sağlamak istediğiniz kaynakları tanımlar, en az bir kaynak gereklidir
-Koşullar(Conditions), kaynakların oluşturulup oluşturulmadığı veya özelliklerin atanıp atanmadığıdır

## Elastic Beanstalk
-AWS Elastic Beanstalk, uygulamaları AWS Cloud'da hızla dağıtmak ve yönetmek(quickly deploy and manage applications) için kullanılabilir.
-Uygulama dosyalarınızı ve isteğe bağlı olarak sunucu günlük dosyalarını Amazon S3'te depolar.
-Elastic Beanstalk, kapasite sağlama, yük dengeleme, otomatik ölçeklendirmeden uygulama durumunu izlemeye kadar dağıtımı gerçekleştirir
-Bir web uygulaması çalıştırmak istediğinizde ancak altyapıyı düşünmek zorunda kalmak istemiyorsanız Elastic Beanstalk'ı kullanabilirsiniz.
-Elastic Beanstalk kullanmanın hiçbir maliyeti yoktur (yalnızca sağladığı kaynaklar, örneğin RDS, ELB, EC2)-Ücretsiz
-Test veya geliştirme uygulamaları için önerilir. Üretim(Production) kullanımı için önerilmez
-Docker ile de kullanılabilir. Böylece Dockerize edilmiş ortamları Elastic Beanstalk üzerinde çalıştırabilirsiniz.
-Aşağıdaki önceden yapılandırılmış platformlar arasından seçim yapabilirsiniz: 
    Java, .Net, PHP, Node.js, Python, Ruby.

## Database
# Amazon Aurora
-Ölçeklenmesi, otomatik yedeklemeler, yüksek kullanılabilirlik ve hata toleransı gerektiren tam olarak yönetilen(fully managed) bir Postgres veya Mysql veritabanına ihtiyacınız olduğunda Aurora'yı düşünün
-Aurora, AWS'ye özel bir veritabanıdır. Bu yüzden her sınavda en az bir soru soruyorlar.
-Mysql ve Postgres veritabanı motorlarını çalıştırabilir
-Mysql, normal Mysql'den 5 kat daha hızlı
-Postgres, normal Postgres'e göre 3 kat daha hızlıdır
-Benzer performans ve kullanılabilirlik seçenekleriyle rakiplerine göre 1/10 maliyet.
-3 AZ'de veritabanınız için 6 kopyayı çoğaltır
-15 aurora kopyasına(aurora replicas) kadar izin verilir
-Aurora veritabanı, Aurora Global Database aracılığıyla birden fazla bölgeye yayılabilir
-Aurora Serverless, Aurora'yı durdurup başlatmanıza ve maliyeti düşük tutarken otomatik olarak ölçeklendirmenize olanak tanır
-Aurora Serverless, seyrek veritabanı kullanımı olan yeni projeler için idealdir
-İki tür çoğaltma vardır: Aurora replikası (15'e kadar), MySQL Read Replica (5'e kadar).
-Beş adede kadar AWS bölgesinde bir Amazon Aurora veritabanı için okuma replikaları(read replicas) oluşturabilirsiniz. Bu özellik, MySQL uyumluluğuna sahip Amazon Aurora için kullanılabilir.
-Bölgeler arası okuma replikaları(Cross-region read replicas), olağanüstü durum kurtarma duruşunuzu geliştirmenize, uygulama kullanıcılarınıza daha yakın bölgelerdeki okuma işlemlerini ölçeklendirmenize ve bir bölgeden diğerine kolayca geçiş yapmanıza olanak tanır.
-Bölgeler arası replikalar(Cross-region read replicas), kullanıcılarınıza hızlı yerel okumalar sağlar.
-Küresel olarak dağıtılan uygulamalar için, tek bir Aurora veritabanının hızlı yerel okumalar ve hızlı olağanüstü durum kurtarma sağlamak için birden çok AWS bölgesine yayılabileceği Global Veritabanı'nı kullanabilirsiniz.
-Global Veritabanı, bir veritabanını birden çok AWS Bölgesinde çoğaltmak için depolama tabanlı çoğaltmayı kullanır ve tipik gecikme süresi 1 saniyeden azdır.
-Amazon Aurora Multi-Master, Aurora MySQL uyumlu sürümünün birden çok Erişilebilirlik Alanında yazma performansını ölçeklendirme yeteneği ekleyen ve uygulamaların okuma/yazma iş yüklerini bir veritabanı kümesindeki birden çok instancea yönlendirmesine ve daha yüksek kullanılabilirlikle çalışmasına olanak tanıyan yeni bir özelliğidir. .
-Amazon Aurora Serverless, Amazon Aurora için isteğe bağlı, otomatik ölçeklendirme yapılandırmasıdır. Veritabanı otomatik olarak başlar, kapanır ve uygulama ihtiyaçlarına göre kapasiteyi artırır veya azaltır.
-Aurora Auto Scaling, tek ana çoğaltma kullanarak bir Aurora DB kümesi için sağlanan Aurora Replikalarının sayısını dinamik olarak ayarlar.
-Amazon Aurora'nın yedekleme özelliği, bulut sunucunuz için belirli bir noktada kurtarma sağlar.

# RDS
-İlişkisel Veritabanı Hizmeti(Relational Database Service) (RDS), ilişkisel veritabanları için AWS Çözümüdür.
-RDS instanceı AWS tarafından yönetilir, veritabanını çalıştıran VM'ye SSH yapamazsınız
-RDS, bir Çevrimiçi İşlem İşleme(Online Transaction Processing) (OLTP) veritabanı türüdür.
-AWS'de şu anda kullanılabilen 6 ilişkisel veritabanı seçeneği vardır; Aurora, Mysql, MariaDB, Postgres, Oracle, Microsoft SQL Sunucusu.
-Bakım aralığını(maintenance window) tanımlayabilirsiniz veya AWS 30 dakikalık bir zaman aralığı planlayacaktır.
-Müşteri tanımlı bakım pencerelerinde(maintenance window) uygulanan otomatik yedeklemeler ve yama uygulaması
-Multi-AZ, yalnızca beklemede olan başka bir AZ'de veritabanınızın tam bir kopyasını oluşturan, etkinleştirebileceğiniz bir seçenektir.
-Multi-AZ için AWS, veritabanındaki değişiklikleri yedek kopyaya otomatik olarak senkronize eder
-Multi-AZ'de Otomatik yük devretme koruması vardır, eğer bir AZ bozulursa yük devretme gerçekleşir ve yedek bağımlı birim(standby slave) ana konuma yükseltilir
-Okuma Çoğaltmaları(Read Replicas), veritabanınızın birden çok kopyasını çalıştırmanıza izin verir, bu kopyalar yalnızca okumaya (yazma yok) izin verir ve performansı artırmak için birincil veritabanlarınızın iş yükünü azaltmayı amaçlar.
-Okuma kopyaları-Read Replicas Eşzamansız çoğaltma kullanır
-Okuma Çoğaltmaları(Read Replicas)'nı kullanmak için otomatik yedeklemeleri etkinleştirmiş olmanız gerekir
-Bir kaynak veritabanı bulut sunucusu, replikalar silinmeden silinirse, her replika, bağımsız bir tek AZ veritabanı bulut sunucusu haline gelir.
-Amazon RDS DB bulut sunucunuz için şifreleme seçeneğini etkinleştirerek Amazon RDS bulut sunucularınızı ve bekleyen anlık görüntülerinizi şifreleyebilirsiniz.
-Mevcut bir DB'yi şifreleyemezsiniz, bir anlık görüntü(snapshot) oluşturmanız, kopyalamanız, kopyayı şifrelemeniz ve ardından anlık görüntüden(snapshot) şifreli bir DB oluşturmanız gerekir.
-Bir DB alt ağ grubu(subnet group), bir VPC'de oluşturduğunuz ve ardından DB bulut sunucularınız için atadığınız bir alt ağlar (tipik olarak private) koleksiyonudur.
-Her bir DB alt ağ grubunun, belirli bir bölgedeki en az iki Erişilebilirlik Alanında alt ağları olmalıdır
-Yalnızca RDS'yi büyütebilirsiniz-scale (compute and storage).
-Amazon RDS, DB ve günlük depolama için EBS birimlerini kullanır (asla instance deposu kullanmaz).
-DB Anlık Görüntüleri(Snapshots) kullanıcı tarafından başlatılır ve DB bulut sunucunuzu bilinen bir durumda istediğiniz sıklıkta yedeklemenizi ve ardından onu bu belirli duruma geri yüklemenizi sağlar.
-Anlık görüntüler(Snapshots), manuel olarak silinene kadar S3'te kalır.
-Kullanılabilir üç depolama türü vardır: Genel Amaçlı (SSD), Tedarik Edilen IOPS (SSD) ve Manyetik.(General Purpose (SSD), Provisioned IOPS (SSD), and Magnetic.)

RDS Depolama Türü

Genel Amaçlı-General Purpose (SSD):
Orta düzeyde G/Ç gereksinimleri olan Veritabanı iş yükleri için kullanın.
Uygun maliyetli.

Sağlanan IOPS-Provisioned IOPS (SSD):
G/Ç(I/O) yoğun iş yükleri için kullanın.
Düşük gecikme süresi ve tutarlı G/Ç.

Manyetik-Magnetic:
Artık önerilmez, geriye dönük uyumluluk için kullanılabilir.
SQL Server veritabanı motorunu kullanırken depolamayı ölçeklendirmenize izin vermez

# DynamoDB
-DynamoDB, tam olarak yönetilen(fully managed) bir NoSQL anahtar/değer ve belge veritabanıdır
-Büyük miktarda veri içeren ancak ölçekleme sırasında öngörülebilir okuma ve yazma performansı gerektiren uygulamalar DynamoDB için uygundur
-DynamoDB, saniyede belirlediğiniz okuma ve yazma kapasitesiyle ölçeklenir
-DynamoDB, verilerin hemen döndürüldüğü ancak verilerin tutarsız olabileceği ve her zaman güncel bir kopyaya sahip olduğu için her zaman lider bölümden okuyacak olan Güçlü Tutarlı Okumalara sahip olacak şekilde sonunda tutarlı Okumalara(eventually consistent Reads) (varsayılan) ayarlanabilir.
-Güçlü tutarlı okumalar(Strong consistent reads), veriler tutarsız olana kadar olacaktır. Veriler asla tutarsız olmayacak ancak gecikme daha yüksek olacaktır. Verilerin kopyaları, 1 saniyelik bir garantiyle tutarlı olacaktır.
-DynamoDB, 3 bölgede 3 kopya veriyi SSD sürücülerinde depolar.
-DynamoDB Akışları(DynamoDB Streams), öğe düzeyindeki değişikliklerin bir listesini tutmanıza veya son 24 saat içinde meydana gelen öğe düzeyindeki değişikliklerin bir listesini sağlamanıza yardımcı olur.
-Amazon DynamoDB Accelerator (DAX), DynamoDB için 10 kata kadar performans artışı sağlayan, tümüyle yönetilen, yüksek düzeyde kullanılabilir bir bellek içi önbellektir.
-DAX, geliştiricilerin cacheleri geçersiz kılmayı, veri doldurmayı veya küme yönetimini yönetmesine gerek kalmadan, DynamoDB tablolarınıza bellek içi hızlandırma eklemek için gereken tüm ağır yükleri kaldırır.
-ElastiCache, nadiren değiştirilen veriler üzerinde okuma performansı için DynamoDB'nin önünde kullanılabilir
-RedShift, DynamoDB'yi gelişmiş iş zekası ile tamamlıyor
-Amazon DynamoDB global tabloları, çok bölgeli, çok yöneticili bir veritabanı dağıtmak için tam olarak yönetilen bir çözüm sunar. Genel bir tablo oluşturduğunuzda, tablonun kullanılabilir olmasını istediğiniz AWS bölgelerini belirtirsiniz. DynamoDB global tabloları, global olarak dağılmış kullanıcılarla çok büyük ölçekli uygulamalar için idealdir.
-Global tablo, tümü tek bir AWS hesabına ait olan bir veya daha fazla replika tablo koleksiyonudur. Genel bir tabloyla, her çoğaltma tablosu aynı veri öğeleri kümesini depolar. DynamoDB, yalnızca bazı öğelerin kısmi olarak çoğaltılmasını desteklemez.
-Bir çoğaltma tablosu(replica table) (veya kısaca çoğaltma), genel bir tablonun parçası olarak işlev gören tek bir DynamoDB tablosudur. Her çoğaltma, aynı veri öğeleri kümesini depolar. Herhangi bir genel tablo, bölge başına yalnızca bir çoğaltma tablosuna sahip olabilir.
-DynamoDB otomatik ölçeklendirme, gerçek trafik modellerine yanıt olarak sizin adınıza sağlanan aktarım hızı kapasitesini dinamik olarak ayarlamak için AWS Application Auto Scaling hizmetini kullanır. Bu, bir tablonun veya global bir ikincil dizinin(secondary index), trafikteki ani artışları kısıtlamadan işlemek için sağlanan okuma ve yazma kapasitesini artırmasını sağlar.
-Bölgeler Arası Çoğaltma(Cross-Region Replication) seçeneğiyle Multi-AZ NoSQL veri deposu.
-Hesaplama yerine aktarım hızına göre fiyatlandırılır
-DynamoDB iki tür ikincil dizini(secondary index) destekler:
    -Genel ikincil dizin(Global secondary index) – Tablodakilerden farklı olabilen bir bölüm anahtarı ve sıralama anahtarı içeren bir dizin.
    -Yerel ikincil dizin(Local secondary index) – Tabloyla aynı bölüm anahtarına sahip ancak farklı bir sıralama anahtarına sahip bir dizin.
-Aşağıdaki yöntemlerden birini kullanarak arama yapabilirsiniz:
    Sorgu işlemi(Query operation) – yalnızca birincil anahtar niteliklerini kullanarak bir tablodaki veya ikincil dizindeki öğeleri bulun.
    Tarama işlemi(Scan operation) – bir tablodaki veya ikincil dizindeki her öğeyi okur ve varsayılan olarak tüm öğeleri döndürür.

# Redshift
-Amazon Redshift, standart SQL ve mevcut İş Zekası (BI) araçlarını kullanarak tüm verilerinizi analiz etmeyi basit ve uygun maliyetli hale getiren hızlı, tam olarak yönetilen(fully managed) bir veri ambarıdır(data warehouse).
-RedShift, analitik uygulamaları için kullanılan SQL tabanlı bir veri DEPOSU(WAREHOUSE)'dur.
-RedShift, bir Çevrimiçi Analitik İşleme(Online Analytics Processing) (OLAP) DB türüdür.
-RedShift, iş zekası için büyük miktarda veriyi işlemek için idealdir.
-Veriler, uzak ana bilgisayarlarda S3, EMR, DynamoDB veya birden çok veri kaynağından yüklenebilir
-Redshift, petabaytlarca veriyi işleyebilir. Redshift Veri Ambarı içindir
-RedShift, erişilebilirliği geliştirmek ve dayanıklılığı artırmak için çoğaltma ve sürekli yedeklemeler kullanır ve bileşen ve düğüm hatalarından otomatik olarak kurtulabilir.
-Redshift yalnızca 1 AZ'de çalışabilir (Tek AZ)
-Redshift, tek bir düğüm veya çoklu düğüm(single node or multiple-node) (küme) üzerinden çalışabilir
-Tek bir düğüm 160 GB boyutundadır
-RedShift, geleneksel bir SQL DB'den 10 kat daha hızlıdır.
-Çoklu düğüm, bir lider düğümden ve birden çok hesaplama düğümünden(leader node and multiple compute nodes) oluşur.
-Her düğüm için saat başına faturalandırılırsınız (çoklu düğümdeki lider düğüm hariç)
-Lider düğüm için faturalandırılmazsınız
-128 adede kadar işlem düğümünüz olabilir
-Redshift'in iki tür Düğüm Türü vardır; Yoğun Bilgi İşlem(Dense Compute) ve Yoğun Depolama(Dense Storage)
-Redshift, compute düğümünde ve S3'te orijinal olan verilerinizin 3 kopyasını yedeklemeye çalışır
-Daha hızlı okumalar için benzer veriler sırayla diskte saklanır
-Redshift veritabanı KMS veya CloudHSM ile şifrelenebilir
-Yedek Tutma varsayılan olarak 1 gündür ve maksimum 35 güne yükseltilebilir
-Redshift, anlık görüntünüzü(snapshot) S3'e teslim edilen başka bir bölgeye eşzamansız(asynchronously back up) olarak yedekleyebilir
-Redshift, sorguları ve verileri tüm yüklere dağıtmak için Büyük Ölçekte Paralel İşleme(Massively Parallel Processing) (MPP) kullanır
-Boş bir tablo olması durumunda, Redshift içe aktarılırken şema oluşturmak için verileri örnekleyecektir
-RedShift sütunlu veri depolama kullanır;
    -Veriler satırlar yerine sütunlarda sıralı olarak depolanır.
    -Sütun tabanlı DB, veri ambarı ve analitik için idealdir.
    -Performansı büyük ölçüde artıran daha az G/Ç(I/O) gerektirir.

# Elasticache
-Elasticache, yönetilen(managed) bir bellek içi önbelleğe alma hizmetidir.
-ElastiCache tarafından sağlanan bellek içi önbelleğe alma, birçok okuma ağırlıklı uygulama iş yükü veya bilgi işlem yoğun iş yükü için gecikmeyi ve aktarım hızını önemli ölçüde iyileştirmek için kullanılabilir
-Elasticache, Memcache veya Redis'i başlatabilir.
-Memcache, HTML parçalarını önbelleğe almak için tercih edilen basit bir anahtar/değer deposudur ve muhtemelen Redis'ten daha hızlıdır. Memcache kalıcı değildir ve bir veri deposu olarak kullanılamaz, ancak bir DB'nin içeriğini önbelleğe alır.
-Redis, daha zengin veri türlerine ve işlemlere sahiptir. Skor tablosu, coğrafi veriler veya okunmamış bildirimleri takip etmek için harika. Veriler Redis ile kalıcıdır. Düğümler değil, parçalar ekleyerek ölçeklenir.
-En sık aynı sorgular önbellekte saklanır
-Düşük gecikme süreleri sağlamak için yalnızca aynı VPC içindeki kaynaklar Elasticache'ye bağlanabilir.

-Kullanım durumları:
    -Web oturumu deposu-Web session store: Yük dengeli web sunucuları olması durumunda, web oturumu bilgilerini Redis'te saklayın, böylece bir sunucu kaybolursa, oturum bilgisi kaybolmaz ve başka bir web sunucusu onu alabilir
    -Veritabanı önbelleğe alma-Database caching: İşleri RDS'den boşaltmak ve sonuçları kullanıcıya daha hızlı döndürmek için popüler sorguları önbelleğe almak için AWS RDS'nin önünde Memcached kullanın
    -Lider Tabloları-Leaderboards: Mobil uygulamanızın milyonlarca kullanıcısına canlı bir lider tablosu sağlamak için Redis'i kullanın
    -Akış veri panoları-Streaming data dashboards: Fabrika katında akış sensörü verileri için bir iniş noktası sağlayarak canlı gerçek zamanlı pano görüntüleri sağlar

# AWS Neptune
-Amazon Neptune'un özü, amaca yönelik, yüksek performanslı bir grafik veritabanı motorudur.
-Amazon Neptune, Property Graph ve W3C'nin RDF'si gibi popüler grafik sorgu dillerini(graph query languages) ve bunların ilgili sorgu dilleri Apache TinkerPop Gremlin ve SPARQL'yi destekler.
-Yüksek düzeyde bağlantılı veri kümelerinde verimli bir şekilde gezinen sorguları kolayca oluşturmanıza olanak tanır
-Okuma replikasına(read replica), belirli bir noktadan sonra kurtarmaya(point-in-time recovery), Amazon S3'e sürekli yedeklemeye(continuous backup) ve Erişilebilirlik Alanları genelinde replikasyona sahiptir.
-Milyarlarca ilişkiyi depolamak ve grafiği milisaniye gecikmeyle sorgulamak için optimize edilmiştir.
-Kullanım durumu:
    -Sosyal Ağ-Social Networking: AWS Neptune, bir sosyal ağ uygulamasındaki yorumlar, takipler ve beğeniler gibi kullanıcı etkileşimlerini yüksek düzeyde etkileşimli sorgular aracılığıyla kolayca işleyebilir
    -Öneri Motorları-Recommendation Engines: Amazon Neptune, müşterinin ilgi alanı ve satın alma geçmişi gibi bilgiler arasındaki ilişkiye dayalı olarak kişiselleştirilmiş ve alakalı ürünler önermek için uygulamalar oluşturabilir.
    -Bilgi Grafikleri-Knowlege Graphs: Kullanıcıların yeni bilgileri hızla keşfetmelerini sağlayacak arama motorları için bir bilgi grafiği oluşturabiliriz.
    -Kimlik Grafikleri-Identity Graphs: reklam hedefleme, kişiselleştirme ve analitik için kullanıcı profili verilerini kolayca bağlamak ve güncellemek için bir grafik veritabanı olarak kullanılabilir

# AWS Database Migration Service
-AWS Database Migration Service, veritabanlarını AWS'ye hızlı ve güvenli bir şekilde geçirmenize yardımcı olur.
-Veritabanlarını AWS RDS veya EC2 tabanlı veritabanlarına geçirmek için Schema Conversion Tool (SCT) ile birlikte kullanın.
-Kaynak veritabanı, geçiş sırasında tam olarak çalışır durumda kalır ve veritabanına bağlı olan uygulamaların kapalı kalma süresini en aza indirir.
-AWS Database Migration Service, verilerinizi en yaygın olarak kullanılan ticari ve açık kaynaklı veritabanlarına ve bu veritabanlarından geçirebilir.
-Schema Conversion Tool, homojen geçişler (aynı veritabanı) için veritabanı şemalarını kopyalayabilir ve heterojen geçişler (farklı veritabanları) için şemaları dönüştürebilir.
-DMS, daha küçük, daha basit dönüşümler için kullanılır ve ayrıca MongoDB ve DynamoDB'yi destekler.
-SCT, veri ambarları gibi daha büyük, daha karmaşık veri kümeleri için kullanılır.
-DMS, şirket içi AWS'ye veya Snowball veya S3'e çoğaltma işlevlerine sahiptir.
-RDS hizmeti aşağıdakileri içerir:
    -Veritabanı instancelarının güvenliği ve yamalanması.
    -Veritabanı instanceları için otomatik yedekleme.
    -DB motoru için yazılım güncellemeleri.
    -Depolama ve bilgi işlem(storage and compute) için kolay ölçeklendirme.
    -Eşzamanlı çoğaltma ile Multi-AZ seçeneği.
    -Multi-AZ seçeneği için otomatik yük devretme(failover).
    -Okuma ağırlıklı iş yükleri için okuma replikaları(Read replicas) seçeneği.

# High Availability Approaches for Databases
-Mümkünse, doğal hata toleransı nedeniyle RDS yerine DynamoDB'yi seçin.
-DynamoDB kullanılamıyorsa, yedeklilik ve otomatik kurtarma özellikleri nedeniyle Aurora'yı seçin.
-Aurora kullanılamıyorsa Multi-AZ RDS'yi seçin.
-Sık RDS anlık görüntüleri(Frequent RDS snapshots), verilerin bozulmasına veya arızalanmasına karşı koruma sağlayabilir ve Multi-AZ dağıtımının performansını etkilemez.
-Bölgesel çoğaltma(Regional replication) da bir seçenektir, ancak kesinlikle tutarlı olmayacaktır.
-Veritabanı EC2 üzerinde çalışıyorsa, HA(High Availability)'yı kendiniz tasarlamanız gerekir.

# Comparison of Databases and Storage Solutions

*** 9-Comparison of Databases and Storage Solutions görseli

<img width="612" alt="Comparison of Databases and Storage Solutions" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/9-Comparison%20of%20Databases%20and%20Storage%20Solutions.JPG">

## Network
# VPC General
-Amazon Virtual Private Cloud (VPC), tanımladığınız bir sanal ağda AWS kaynaklarını başlatabileceğiniz Amazon Web Services (AWS) bulutunun mantıksal olarak yalıtılmış bir bölümünü sağlamanıza olanak tanır.
-IP aralıklarının seçimi(selection of IP ranges), alt ağların oluşturulması(creation of subnets) ve rota tablolarının(route tables) ve ağ geçitlerinin yapılandırılması dahil olmak üzere sanal ağ ortamı üzerinde tam kontrol sağlar.
-Bir VPC, AWS'deki diğer VPC'lerden mantıksal olarak yalıtılmıştır.
-Amazon EC2 kaynakları ilk kez sağlandığında her AWS hesabı için otomatik olarak bir varsayılan VPC oluşturulur.
-VPC'ler Bölgeye Özeldir ve bölgelere yayılmazlar
-Bölge başına en fazla 5 VPC oluşturabilirsiniz
-Her bölge varsayılan bir VPC ile birlikte gelir
-VPC başına 200 alt ağınız(subnet) olabilir
-IPv4 CIDR bloğunu ve IPv6 CIDR bloklarına ek olarak (VPC'nin adresi) kullanabilirsiniz.
-Ücretsiz: VPC'ler, Yönlendirme Tabloları(Route Tables), NACL'ler, Güvenlik Grupları, İnternet Ağ Geçidi'ler(Internet Gateway), VPC Eşleştirme(VPC Peering'ler ücretsizdir
-NAT Ağ Geçitleri(NAT Gateways), NAT Eşgörünümü(NAT Instance), VPN Ağ Geçidi(VPN Gateway), Müşteri Ağ Geçitlerinin(Customer Gateways) maliyeti vardır.
-VPC, AWS kaynaklarınıza DNS ana bilgisayar adları atayabilir.

*** 10-Basic VPC example görseli

<img width="812" alt="Basic VPC example" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/10-Basic%20VPC%20example.JPG">

# Route Tables
-VPC rota tabloları (yönlendirici), bir bölge içindeki AZ'ler arasında yönlendirme gerçekleştirir.
-VPC yönlendirici, farklı AZ'leri birbirine bağlar ve VPC'yi İnternet Ağ Geçidine(Internet Gateway) bağlar.
-Her alt ağın bir Yönlendirme Tablosu(Route Table) vardır. Rota tabloları, VPC içindeki trafiği iletmek için kullanılır.
-Rota tablolarında ayrıca harici hedeflere girişler bulunur.
-Her alt ağ yalnızca bir yönlendirme tablosuyla ilişkilendirilebilir.
-Birden çok alt ağa bir rota tablosu atayabilir.
-Ana rota tablosu silinemez.

*** 11-Route Table example görseli

<img width="812" alt="Route Table" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/11-Route%20Table%20example.JPG">

# Subnets
-Alt ağ türleri:
    -Bir alt ağın trafiği bir internet ağ geçidine yönlendirilirse, alt ağ genel(public) alt ağ olarak bilinir.
    -Bir alt ağın internet ağ geçidine(internet gateway) giden bir yolu yoksa, alt ağ özel(private) alt ağ olarak bilinir.
    -Bir alt ağın internet ağ geçidine(internet gateway) giden bir rotası yoksa ancak trafiği bir VPN bağlantısı için sanal bir özel ağ geçidine(virtual private gateway) yönlendirilmişse, alt ağ yalnızca VPN alt ağı(VPN-only subnet) olarak bilinir.
-Mevcut CIDR bloklarıyla çakışan ek CIDR blokları oluşturamazsınız.
-Her alt ağda AWS tarafından 5 IP adresi ayrılmıştır. Bunlar, CIDR bloklarındaki ilk 4 ve son 1 IP adresidir. 
-İnternet Ağ Geçidi(Internet Gateway), VPC'nizdeki bulut sunucuları ile internet arasında iletişime izin veren, yatay olarak ölçeklendirilmiş, yedekli ve yüksek oranda kullanılabilir bir VPC bileşenidir.
-İnternet Ağ Geçitleri(Internet Gateway) (IGW) oluşturulmalı ve ardından bir VPC'ye eklenmeli, bir rota tablosuna(Route Table) eklenmeli ve ardından ilgili alt ağlarla ilişkilendirilmelidir.
-Alt ağınız bir İnternet rotasıyla(Route Table) ilişkilendirilmişse, bu bir genel(public) alt ağdır.
-Bir seferde yalnızca 1 IGW'yi bir VPC'ye ekleyebilir.
-4 çeşit Ağ Geçidinden bahsedebiliriz.
    -İnternet ağ geçidi(Internet gateway) (IGW) – Genel İnternet bağlantısının AWS VPC tarafı.
    -Sanal özel ağ geçidi(Virtual private gateway) (VPG) – AWS tarafında VPC uç noktası.
    -Müşteri Ağ Geçidi(Customer Gateway) (CGW) – bağlantının müşteri ucunun temsili.
    -Yalnızca Çıkış İnternet Ağ Geçidi(Egress-only Internet Gateway) IPv6 adresli bulut sunucuları için giden İnternet erişimi sağlar.

# NAT Instance & NAT Gateway
NAT Instance:

-NAT Instance, hesabın sahibi tarafından yönetilir.
-Bir NAT Instance oluştururken, Instanceta kaynak ve hedef kontrolünü(disable source and destination check) devre dışı bırakmalısınız
-NAT Instanceleri, bir İnternet Ağ Geçidine(Internet Gateway) giden bir rotaya sahip genel(public) bir alt ağda bulunmalıdır.
-NAT Instanceına giden özel(private) alt ağ yolunuz olmalıdır
-NAT Instancelerinin güvenlik gruplarına atanması gerekir.
-Bir kale-bastion (atlama) ana bilgisayarı olarak kullanabilir.
-Bir NAT Instanceının boyutu, ne kadar trafiğin işlenebileceğini belirler
-Otomatik Ölçeklendirme Grupları(Autoscaling Groups), farklı AZ'lerde birden çok alt ağ kullanılarak yüksek kullanılabilirlik(High availability) (HA) elde edilebilir ve bir komut dosyası kullanarak bunlar arasında yük devretmeyi(failover) otomatikleştirin

*** 12-Nat Instance example görseli

<img width="912" alt="Nat Instance" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/12-Nat%20Instance%20example.JPG">

NAT Gateway:

-NAT Gateway tamamen AWS tarafından yönetilir(fully managed).
-NAT Gateway, bir Erişilebilirlik Alanı içinde yedeklidir (EC2 bulut sunucusunun başarısızlığından kurtulabilir)
-1 AZ içinde yalnızca 1 NAT Ağ Geçidiniz olabilir (AZ'lere yayılamaz)
-5 GBPS'den başlar ve 45 Gbps'ye kadar ölçeklenir
-Genel(public) IP için Elastik bir IP adresi kullanır.
-NAT Gateway, kurumsal sistemler için tercih edilen kurulumdur.
-NAT Gatewayin yamalama gereksinimi yoktur ve NAT Gateway için Kaynak/Hedef kontrollerini devre dışı bırakmaya gerek yoktur (NAT instancelarınden farklı olarak)
-NAT Gatewaye otomatik olarak genel(public) bir IP adresi atanır
-Herhangi bir güvenlik grubuyla ilişkili değil.
-NAT Gateway için Rota Tabloları(Route Tables) YÜKLENMELİDİR
-Bir Gatewayi paylaşan birden çok AZ'deki kaynak, her AZ'de bir Gateway oluşturmadığınız ve rota tablolarını buna göre yapılandırmadığınız sürece Gateway kapanırsa internet erişimini kaybeder.

*** 13-Nat Gateway example görseli

<img width="912" alt="Nat Gateway" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/13-Nat%20Gateway%20example.JPG">

# Security Group & Network Access List (NACL)
Security Groups:

-Güvenlik Grupları, instance düzeyinde bir güvenlik duvarı görevi görür
-Özel olarak izin verilmez, tüm gelen trafik varsayılan olarak engellenir
-Instancedan tüm giden trafiğe varsayılan olarak izin verilir
-Kaynağı bir IP aralığı, tek bir IP adresi veya başka bir güvenlik grubu olarak belirleyebilirsiniz.
-NACL'den farklı olarak, bir güvenlik grubuna yalnızca izin kuralları atayabilirsiniz, reddetme kuralları atayamazsınız.
-Güvenlik Grupları STATEFULL (gelen trafiğe izin veriliyorsa, giden trafiğe de izin verilir)
-Bir Güvenlik Grubunda yapılan herhangi bir değişiklik hemen uygulanır.
-Güvenlik grubu adlarını diğer güvenlik gruplarında kaynak veya hedef olarak kullanabilirsiniz.
-EC2 bulut sunucularına birden fazla güvenlik grubu atayabiliriz.
-Güvenlik grupları, birden çok EC2 instnce içerebilir
-Belirli bir IP adresini engelleyemiyoruz. Bu amaçla, alt ağların Ağ Erişim Listesi(Network Access List) (NACL) tablolarına ihtiyacımız var.
-Bir ENI ile ilişkilendirilmiş 16 Güvenlik Grubunuz olabilir (varsayılan 5)

Network Access List (NACL):

-Ağ ACL'sinin fonksiyonu subnet düzeyindedir.
-NACL'ler ile izin verme ve reddetme kurallarına sahip olabilirsiniz.
-Ağ ACL'leri, en düşük sayıdan açık bir şekilde(explicit) reddetmeye kadar sırayla değerlendirilen numaralandırılmış bir kurallar listesi içerir.
-Ağ ACL'lerinin ayrı gelen ve giden kuralları vardır ve her kural trafiğe izin verebilir veya trafiği reddedebilir.
-Ağ ACL'leri STATELESS olduğundan yanıtlar trafiğin yönüne ilişkin kurallara tabidir.
-NACL'ler, alt ağ(subnet) içindeki trafiğe değil, yalnızca alt ağa giriş veya çıkış olan trafiğe uygulanır.
-Bir VPC, otomatik olarak tüm gelen/giden trafiğe izin veren varsayılan bir ağ ACL'si ile birlikte gelir.
-Özel(kendi oluşturduğumuz) bir NACL, varsayılan olarak hem gelen hem de giden tüm trafiği reddeder.
-Tüm alt ağlar, bir ağ ACL'si ile ilişkilendirilmelidir.
-Özel NACL'ler oluşturabilirsiniz. Varsayılan olarak, her özel ağ ACL'si, siz kurallar ekleyene kadar tüm gelen ve giden trafiği reddeder.
-Bir ağ ACL'sini birden çok alt ağla ilişkilendirebilirsiniz; ancak bir alt ağ aynı anda yalnızca bir ağ ACL'si ile ilişkilendirilebilir.
-NACL'ler, belirli IP'leri veya aralıkları engellemek için tercih edilen seçenektir.
-Güvenlik grupları, belirli IP aralıklarını engellemek için kullanılamaz.
-NACL ilk savunma hattı, güvenlik grubu ikinci hat.
-NACL'lerde yapılan değişiklikler, Güvenlik Grupları gibi hemen yürürlüğe girer.

*** 14-Security Group and NACL görseli

<img width="912" alt="Security Group and NACL" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/14-Security%20Group%20and%20NACL.JPG">

# VPC Connectivity
Bir VPC'ye bağlanmanın birkaç yöntemi vardır. Bunlar şunları içerir:

AWS Yönetilen VPN - AWS Managed VPN.
AWS Doğrudan Bağlantı - AWS Direct Connect.
AWS Direct Connect artı bir VPN - AWS Direct Connect plus a VPN.
AWS VPN CloudHub 
Yazılım VPN'i - Software VPN.
Geçiş VPC'si - Transit VPC.
VPC Eşleme - VPC Peering.
AWS Özel Bağlantı - AWS PrivateLink.
VPC Uç Noktaları - VPC Endpoints.

AWS Managed VPN:

-Mevcut internetiniz üzerinden AWS Managed IPSec VPN bağlayıcısı
-Kullanım örneği: Direct Connect veya diğer VPN için bir VPC'ye veya yedek bağlantıya hızlı ve genellikle basit bir yolla güvenli bir tünel bağlantısı kurmanız gerekiyorsa
-AWS tarafında bir Sanal Özel Ağ Geçidi(Virtual Private Gateway) (VGW) gereklidir
-Müşteri tarafında bir müşteri Ağ Geçidi(customer Gateway) gereklidir
-Müşteri ağ geçidinde İnternet'e yönlendirilebilir bir IP adresi gereklidir.
-Yedeklilik için bağlantı başına iki tünel yapılandırılmalıdır.

*** 15-AWS Managed VPN görseli

<img width="912" alt="AWS Managed VPN" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/15-AWS%20Managed%20VPN.JPG">

AWS Direct Connect:

-AWS Direct Connect, şirket içi bir ağdan Amazon VPC'ye özel bir bağlantı kurmayı kolaylaştırır.
-AWS Direct Connect'i kullanarak AWS ile veri merkeziniz, ofisiniz veya ortak ortamınız arasında özel bağlantı kurabilirsiniz.
-Bu özel bağlantı, ağ maliyetlerini azaltabilir, bant genişliği verimini artırabilir ve internet tabanlı bağlantılardan daha tutarlı bir ağ deneyimi sağlayabilir.
-AWS Direct Connect, AWS ağları ile AWS Direct Connect konumlarından biri arasında 1 Gb/sn veya 10 Gb/sn ayrılmış ağ bağlantıları(dedicated network) (veya birden çok bağlantı) kurmanıza olanak tanır.
-AWS Direct Connect, geçiş halindeki(in transit) trafiğinizi şifrelemez.
-Kullanım örneği: AWS'ye büyük bir ağ bağlantısına ihtiyaç duyduğunuzda veya AWS'de kurumsal kullanıcılarınıza çok sayıda kaynak ve hizmet sağlanması gerektiğinde
-Doğrudan bağlantının Artıları: Daha öngörülebilir ağ performansı; potansiyel bant genişliği maliyeti azaltma; 10 Gbps'ye kadar sağlanan bağlantı; BGP eşleme ve yönlendirmeyi destekler
-Doğrudan Bağlantının Eksileri: Ek telekom ve hosting sağlayıcı ilişkisi ve/veya ağ devreleri gerektirebilir; yüksek fiyat

*** 16-AWS Direct Connect görseli

<img width="912" alt="Direct Connect" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/16-AWS%20Direct%20Connect.JPG">

AWS Direct Connect Plus VPN:

-AWS Direct Connect artı VPN ile bir veya daha fazla AWS Direct Connect özel ağ bağlantısını Amazon VPC VPN ile birleştirebilirsiniz.
-Kullanım örneği: Direct Connect üzerinden ek şifrelenmiş tünel güvenliğine ihtiyacınız var.
-Bu çözüm, VPN çözümünün AWS tarafından yönetilen avantajlarını düşük gecikme süresi, artırılmış bant genişliği, AWS Direct Connect çözümünün daha tutarlı avantajları ve uçtan uca, güvenli bir IPsec bağlantısıyla birleştirir.
-Bu kombinasyon, ağ maliyetlerini de azaltan, bant genişliği verimini artıran ve internet tabanlı VPN bağlantılarından daha tutarlı bir ağ deneyimi sağlayan IPsec şifreli özel bir bağlantı sağlar.

AWS VPN CloudHub:

-AWS VPN CloudHub, VPC ile veya VPC olmadan kullanabileceğiniz basit bir hub ve bağlı bileşen(hub-and-spoke) modelinde çalışır.
-Kullanım örneği: AWS kaynaklarına ve birbirlerine yedekleme veya birincil WAN erişimi için uzak ofisleri birbirine bağlayın -Birden fazla şube ofisiniz ve mevcut İnternet bağlantınız varsa ve uygun, potansiyel olarak düşük maliyetli bir hub ve bağlı bileşen modeli uygulamak istiyorsanız bu tasarımı kullanın bu uzak ofisler arasında birincil veya yedek bağlantı için.
-VPN CloudHub, donanım tabanlı VPN'ler için kullanılır ve şube ofislerinizi bir VPC'ye gidecek şekilde yapılandırmanıza ve ardından bunu kurumsal DC'ye (hub ve hub olarak AWS'li konuşmacı topolojisi-hub and spoke topology with AWS as the hub) bağlamanıza olanak tanır.
-Bir Sınır Ağ Geçidi Protokolü(Border Gateway Protocol)  (BGP) kullanır.
-Şubeler birbirleriyle konuşabilir (ve yedeklilik sağlar).
-Direct Connect bağlantılarına sahip olabilir.
-Saatlik ücretler artı veri çıkış ücretleri.

*** 18-AWS VPN Cloudhub görseli

<img width="912" alt="AWS VPN Cloudhub" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/18-AWS%20VPN%20Cloudhub.JPG">

Software VPN:

-Amazon VPC, uzak ağınız ile Amazon VPC ağınızda çalışan bir yazılım VPN cihazı arasında bir VPN bağlantısı oluşturarak Amazon VPC bağlantınızın her iki tarafını da tam olarak yönetme esnekliği sunar.
-Kullanım örneği: Uyumluluk nedenleriyle VPN bağlantısının her iki ucunu da yönetmelisiniz veya AWS tarafından desteklenmeyen bir VPN seçeneği kullanmak istiyorsunuz
-Uyumluluk amacıyla veya şu anda Amazon VPC'nin VPN çözümü tarafından desteklenmeyen ağ geçidi-gateway cihazlarından yararlanmak için VPN bağlantısının her iki ucunu da yönetmeniz gerekiyorsa bu seçenek önerilir.

Transit VPC:

-Yukarıda bahsedilen Yazılım VPN tasarımını temel alarak AWS'de küresel bir geçiş ağı oluşturabilirsiniz. Farklı VPC'ler bağlamanız ve bunları tek bir noktada işlemeniz gerekiyorsa, Transit VPC'sini düşünün.
-Kullanım örneği: Birden çok bölgede birbiriyle iletişim kurması gereken konumlar ve VPC tarafından dağıtılan varlıklar
-Transit VPC, küresel bir ağ geçiş merkezi oluşturmak için birden çok, coğrafi olarak dağınık VPC'leri ve uzak ağları birbirine bağlamak için ortak bir stratejidir.
-Bir Transit VPC, ağ yönetimini basitleştirir ve birden çok VPC'yi ve uzak ağları bağlamak için gereken bağlantı sayısını en aza indirir.

*** 19-Transit VPC görseli

<img width="912" alt="Transit VPC" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/19-Transit%20VPC.JPG">

VPC Peering:

-VPC eşleme bağlantısı, iki VPC arasındaki trafiği özel IPv4 adresleri veya IPv6 adresleri kullanarak yönlendirmenizi sağlayan bir ağ bağlantısıdır.
-Kullanım Örneği: Birden çok VPC'nin iletişim kurma veya birbirlerinin kaynaklarına erişme ihtiyacı
-Her iki VPC'deki instancelar, aynı ağ içindeymiş gibi birbirleriyle iletişim kurabilir.
-Kendi VPC'leriniz arasında veya başka bir AWS hesabındaki bir VPC ile bir VPC eşleme bağlantısı oluşturabilirsiniz.
-VPC'ler farklı bölgelerde olabilir (bölgeler arası VPC eşleme bağlantısı olarak da bilinir).
-Farklı bölgelerdeki VPC'ler arasında gönderilen veriler şifrelenir (trafik ücretleri uygulanır)
-Aynı anda herhangi iki VPC arasında yalnızca bir eşleme bağlantısı olabilir.
-Diğer hesaplarla eşleşebilir (bölgeler içinde veya arasında).
-Sahip olduğunuz her VPC için birden çok VPC eşleme bağlantısı oluşturabilirsiniz, ancak geçişli eşleme ilişkileri(transitive peering) desteklenmez.
-Yönlendirmeyi yapılandırmak için rota tablolarını(route tables) güncellemelidir.
-Eşlenen VPC'de bekleyen erişim isteğini kabul etmeniz gerekiyor.

*** 20-VPC Peering görseli

<img width="912" alt="VPC Peering" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/20-VPC%20Peering.JPG">

AWS PrivateLink:

-AWS PrivateLink, verilerin genel İnternet'e maruz kalmasını ortadan kaldırarak bulut tabanlı uygulamalarla paylaşılan verilerin güvenliğini basitleştirir.
-Amazon ağında güvenli bir şekilde VPC'ler, AWS hizmetleri ve şirket içi uygulamalar arasında özel bağlantı sağlar
-Ağ mimarisini önemli ölçüde basitleştirmek için hizmetleri farklı hesaplar ve VPC'ler arasında bağlamayı kolaylaştırır.
-Kullanım örneği: Genel internet(public subnets) yerine diğer AWS veya Marketplace hizmetlerine ulaşmak için AWS omurgasını kullanarak özel alt ağları(private subnets) gerçek anlamda koruyun.

SINAV İPUCU: AWS PrivateLink ile ClassicLink arasındaki farkı öğrenin. ClassicLink, EC2-Classic instancelarını aynı bölge içinde hesabınızdaki bir VPC'ye bağlamanıza olanak tanır. EC2-Classic, VPC'lerin tanıtılmasından önceki eski bir platformdur ve Aralık 2013'ten sonra oluşturulan hesaplar için mevcut değildir. Ancak ClassicLink, sınav sorularında olası (yanlış) bir yanıt olarak karşımıza çıkabilir, bu nedenle bunun ne olduğunu bilmeniz gerekir.

*** 21-AWS Privatelink görseli

<img width="912" alt="AWS Privatelink" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/21-AWS%20Privatelink.JPG">

VPC Endpoints:

-Bir Arabirim uç noktası(Interface endpoint), AWS PrivateLink kullanır ve desteklenen bir hizmete yönlendirilen trafik için bir giriş noktası görevi gören özel bir IP adresine sahip esnek bir ağ arabirimidir(elastic network interface) (ENI).
-PrivateLink'i kullanarak VPC'nizi desteklenen AWS hizmetlerine, diğer AWS hesapları tarafından barındırılan hizmetlere (VPC uç nokta hizmetleri-VPC Endpoint services) ve desteklenen AWS Marketplace iş ortağı hizmetlerine bağlayabilirsiniz.
-Bir arabirim VPC uç noktası (arayüz uç noktası-interface endpoint), AWS PrivateLink tarafından desteklenen hizmetlere bağlanmanıza olanak tanır.
-Ağ geçidi uç noktaları(Gateway endpoints) yalnızca S3 ve DynamoDB için kullanılabilir
-Kullanım örneği: Herhangi bir internet bağlantısı olmadan özel bir alt ağda(private subnet) S3 ve DynamoDB'ye erişebilirsiniz

*** 22-VPC Endpoint görseli

<img width="912" alt="VPC Endpoint" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/22-VPC%20Endpoint.JPG">

# VPC Flow Logs
-Flow Logs, bir VPC'deki ağ arabirimlerine giden ve giden IP trafiği hakkında bilgi yakalar.
-Flow Log verileri, Amazon CloudWatch Günlükleri kullanılarak depolanır.
-VPC Flow Logs, doğrudan bu günlükleri almanıza ve analiz etmenize olanak tanıyan bir S3 klasörüne gönderilebilir.
-Flow Logs oluşturulduktan sonra yapılandırmasını değiştiremezsiniz.

## Direct Connect
# Direct Connect General
-AWS Direct Connect, bir müşterinin şirket içi sitelerini AWS'ye bağlamak için İnternet kullanımına bir alternatif sağlayan bir ağ hizmetidir.
-Veriler, AWS ile müşterinin veri merkezi veya kurumsal ağı arasındaki özel ağ bağlantısı aracılığıyla iletilir.
-Faydalar:
    -Büyük hacimli trafik kullanırken maliyeti azaltın.
    -Güvenilirliği artırın (öngörülebilir performans).
    -Bant genişliğini artırın (öngörülebilir bant genişliği).
    -Gecikmeyi azaltın.
-Her AWS Direct Connect bağlantısı, bir veya daha fazla sanal arabirim(virtual interfaces) (VIF) ile yapılandırılabilir.
-Genel-public VIF'ler, S3, EC2 ve DynamoDB gibi kamu hizmetlerine erişime izin verir.
-Özel-private VIF'ler, VPC'nize erişime izin verir.
-Genel VIF'lerde genel IP adresleri kullanmalıdır.
-Özel VIF'lerde özel IP adresleri kullanmalıdır.
-Direct Connect üzerinden katman 2 yapılamaz (yalnızca L3).
-Direct Connect'ten bölgedeki tüm AZ'lere bağlanabilirsiniz.
-Genel VIF'ler üzerinden uzak bölgelere IPSec bağlantıları kurabilirsiniz.
-Daha yüksek bant genişliği için birden çok bağlantı noktasını bağlayabilirsiniz.
-Sanal arabirimler(Virtual interfaces), AWS genel hizmetlerine (ör. EC2/S3) veya özel hizmetlere (ör. VPC tabanlı kaynaklar) bağlanacak şekilde yapılandırılır.
-1Gbps ve 10Gbps olarak mevcuttur.
-AWS Direct Connect Çözüm Ortakları aracılığıyla 50 Mb/sn, 100 Mb/sn, 200 Mb/sn, 300 Mb/sn, 400 Mb/sn ve 500 Mb/sn hızları satın alınabilir.
-Rota tablolarının(Route tables) Direct Connect bağlantısını gösterecek şekilde güncellenmesi gerekir.
-Bağlantı Toplama Grupları(Link Aggregation Groups) (LAG) kullanarak 4 adede kadar Direct Connect bağlantı noktasını tek bir bağlantıda toplayabilir
-Sanal arabirimleri(virtual interfaces) bağlamak için teknik gereksinimler:
    -Genel veya özel Otonom Sistem Numarası(public or private Autonomous System Number) (ASN.) Genel bir ASN kullanıyorsanız, ona sahip olmalısınız. Özel bir ASN kullanıyorsanız, 64512 - 65535 aralığında olmalıdır.
    -Seçtiğiniz yeni bir kullanılmamış VLAN etiketi.
    -Özel-private Bağlantı (VPC) – VPC Sanal Özel Ağ Geçidi(Virtual Private Gateway) (VGW) Kimliği.
    -Genel-public Bağlantı – BGP oturumu için sizin tarafınızdan tahsis edilen Genel IP'ler (/30).

*** 16-AWS Direct Connect görseli

<img width="912" alt="AWS Direct Connect" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/16-AWS%20Direct%20Connect.JPG">

# Direct Connect Gateway
-Direct Connect Gateway, herhangi bir AWS Bölgesindeki (AWS Çin Bölgesi hariç) VPC'lerle arabirim oluşturmanıza olanak tanır.
-Bir AWS Direct Connect ağ geçidini aşağıdaki ağ geçitlerinden biriyle ilişkilendirirsiniz:
    -Aynı bölgede birden fazla VPC'niz olduğunda bir geçiş ağ geçidi(transit gateway).
    -Sanal bir özel ağ geçidi(virtual private gateway).
-BGP oturumlarının sayısını azaltarak birden fazla Sanal Özel Bulut(Virtual Private Clouds) (VPC) ile arayüz oluşturmak için özel sanal arayüzü(virtual interface) paylaşabilir.
-Direct Connect ağ geçidi, küresel olarak kullanılabilen bir kaynaktır.
-Direct Connect ağ geçidini herhangi bir genel Bölgede oluşturabilir ve buna diğer tüm genel Bölgelerden erişebilirsiniz.

*** 23-AWS Direct Connect Gateway görseli

<img width="912" alt="AWS Direct Connect Gateway" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/23-AWS%20Direct%20Connect%20Gateway.JPG">

# AWS Global Accelerator
-AWS Global Accelerator, yerel veya global kullanıcılarla uygulamaların kullanılabilirliğini ve performansını iyileştiren bir hizmettir.
-Application Load Balancer, Network Load Balancer veya EC2 bulut sunucuları gibi tek veya birden çok AWS Bölgesindeki uygulama uç noktalarına sabit giriş noktası görevi gören statik IP adresleri sağlar.
-Kullanıcılardan uygulamalara giden yolu optimize etmek için AWS global ağını(AWS global network) kullanır ve TCP ve UDP trafiğinin performansını iyileştirir.
-AWS Global Accelerator, uygulama uç noktalarının durumunu sürekli olarak izler ve sağlıksız bir uç noktayı tespit eder ve trafiği 1 dakikadan kısa sürede sağlıklı uç noktalara yönlendirir.
-Kullanıcıları sürekli olarak aynı uç noktaya yönlendirmeniz gereken durum bilgisi olan uygulamalar için, bağlantı noktası ve protokolden bağımsız olarak bir kullanıcıdan gelen tüm istekleri aynı uç noktaya yönlendirmeyi seçebilirsiniz.
-Varsayılan olarak, AWS Global Accelerator, her zaman açık ağ akışı izleme(always-on network flow) ve otomatik hat içi azaltma(automated in-line mitigation) kullanarak uygulama kapalı kalma süresini ve hizmet reddi(denial of service attacks) saldırılarından kaynaklanan gecikmeyi en aza indiren AWS Shield Standard tarafından korunur.

*** 24-Global Accelerator görseli

<img width="912" alt="Global Accelerator" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/24-Global%20Accelerator.JPG">

## Cloudfront
# Cloudfront General
-Cloudfront bir CDN'dir (Content Distribution Network). Yakındaki önbelleğe alınmış içeriği sunarak web sitesinin hızlı yüklenmesini sağlar.
-CloudFront, popüler web sitesi görüntüleri, videolar, medya dosyaları veya yazılım indirmeleri gibi uç teslimden(edge delivery) yararlanan sık erişilen statik içeriğin dağıtımı için iyi bir seçimdir.
-Uç Konumu(Edge Location), içeriğin önbelleğe alındığı konumdur (AWS bölgeleri/AZ'lerden ayrı).
-Köken(origin), CDN'nin dağıtacağı dosyaların kaynağıdır.
-Kaynaklar bir S3 kovası, bir EC2 bulut sunucusu, bir Elastic Load Balancer veya Route 53 olabilir - ayrıca harici olabilir (AWS dışı).
-Amazon S3'ü kaynak olarak kullanırken tüm nesnelerinizi bucketa yerleştirirsiniz.
-Nesneleri herkese açık hale getirebilir veya CloudFront imzalı URL'leri(signed URLs) kullanabilirsiniz.
-Edge Locations sadece salt okunur(read-only) değildir, örneğin onlara yazabilirsiniz. PUT objects
-TTL (Yaşama Süresi), önbelleğin(cache) süresinin ne kadar süreceğini tanımlar (önbelleği yenile)
-Önbelleğinizi geçersiz kıldığınızda, hemen süresinin dolmasını sağlarsınız (önbelleğe alınmış verileri yeniler)
-Önbelleği yenilemek, Uç Konumları(Edge Locations) güncellemek için aktarım maliyetleri nedeniyle Paraya mal olur
-Origin, dosyalarınızın orijinal kopyalarının bulunduğu adrestir, ör. S3, EC2, ELB, Route 53
-Dağıtım(Distribution), bir Uç Konumları(Edge Locations) koleksiyonunu ve önbelleğe alınmış içeriğinizi nasıl işlemesi gerektiğine ilişkin davranışı tanımlar.
-Özel-private S3 kovalarına erişmek için Origin Identity Access (OAI) kullanılır
-Önbelleğe alınmış içeriğe erişim, İmzalı URL(Signed URL) veya İmzalı Çerezler(Signed Cookies) aracılığıyla korunabilir
-Kara listeler ve beyaz listeler coğrafya için kullanılabilir; her seferinde yalnızca birini kullanabilirsiniz.
-Coğrafi kısıtlama (coğrafi engelleme)-geo-restriction (geo-blocking) için iki seçenek mevcuttur:
    -CloudFront coğrafi kısıtlama özelliğini kullanın (bir dağıtımdaki ve ülke düzeyindeki tüm dosyalara erişimi kısıtlamak için kullanın).
    -Bir 3. taraf coğrafi konum hizmeti kullanın (bir dağıtımdaki dosyaların bir alt kümesine erişimi kısıtlamak ve ülke düzeyinde daha ayrıntılı ayrıntı düzeyi için kullanın).
-Lamda@Edge, yanıtın davranışını değiştirmek için her isteği bir Lambda'dan geçirmenize olanak tanır

*** 25-Cloud Front görseli

<img width="912" alt="Cloud Front" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/25-Cloud%20Front.JPG">

# AWS WAF
-AWS WAF, CloudFront'a iletilen HTTP ve HTTPS isteklerini izlemenize ve içeriğinize erişimi kontrol etmenize olanak tanıyan Web Uygulaması Güvenlik Duvarı(Web Application Firewall) anlamına gelir.
-AWS WAF ile, aşağıdakiler gibi bir web erişim kontrol listesindeki (web ACL) koşullara dayalı olarak içeriğe erişimi koruyabilirsiniz:
    -Kaynak IP adresi.
    -Sorgu dizelerindeki değerler.
-CloudFront, isteklere istenen içerikle veya bir HTTP 403 durum koduyla (forbidden) yanıt verir.
-İlgili dağıtımı web ACL ile ilişkilendirmeniz gerekiyor.

*** 26-AWS WAF Görseli

<img width="912" alt="AWS WAF" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/26-AWS%20WAF.JPG">

# Lambda@Edge
-Lambda@Edge, sunucuları tedarik etmeden veya yönetmeden, son kullanıcılara en düşük ağ gecikmesiyle yanıt vererek küresel olarak AWS konumlarında kod çalıştırmanıza olanak tanır.
-Lambda@Edge, CloudFront'un sunduğu içeriği özelleştirmek için Node.js ve Python Lambda işlevlerini çalıştırmanıza olanak tanır ve işlevleri görüntüleyiciye daha yakın AWS konumlarında yürütür.
-İşlevler, sunucuları sağlamadan veya yönetmeden CloudFront olaylarına(events) yanıt olarak çalışır. CloudFront isteklerini ve yanıtlarını aşağıdaki noktalarda değiştirmek için Lambda işlevlerini kullanabilirsiniz:
-Node.js kodunuzu AWS Lambda'ya yükleyin ve işlevinizi bir Amazon CloudFront isteğine yanıt olarak tetiklenecek şekilde yapılandırın.
-Ardından kod, içerik için bir istek alındığında küresel olarak AWS konumlarında yürütülmeye hazır olur ve küresel olarak CloudFront isteklerinin hacmiyle ölçeklenir.

## Route 53
Tanımlar;
-Üst Düzey Etki Alanı(Top-Level Domain) example.com etki alanının son bölümü
-İkinci Düzey Etki Alanı(Second Level Domain) örneği.CO.UK etki alanının ikinci son kısmı
-Alan Adı(Domain Registrar) Kayıt Şirketi Alan adlarını kaydettirdiğiniz 3. taraf şirket
-Ad Sunucusu (NS)(Name Server (NS)): Bir etki alanı için DNS kayıtlarını içeren sunucu(lar)
-Yetki Başlangıcı (SOA)(Start of Authority (SOA)), DNS bölgesi ve ilişkili DNS kayıtları hakkında bilgiler içerir. Amazon Route 53, barındırılan bölgeler(hosted zones) için Ad Sunucusu (NS) ve Yetki Başlangıcı (SOA) kayıtlarını otomatik olarak oluşturur.
-A Kaydı(A record), bir alan adını doğrudan bir IP adresine dönüştüren bir DNS kaydıdır.
-CNAME, bir alan adını başka bir alan adına dönüştürmenize izin veren kayıt DNS kaydıdır.
-Yaşam Süresi(Time to Live) (TTL), bir DNS kaydının önbelleğe alınacağı süre
-Barındırılan bölge(hosted zone), belirli bir etki alanı için bir kayıt koleksiyonudur.
-İki tür bölge vardır:
    Genel ana bilgisayar bölgesi(Public host zone) – trafiğin İnternette nasıl yönlendirileceğini belirler.
    VPC için özel barındırılan bölge(Private hosted zone for VPC) – trafiğin VPC içinde nasıl yönlendirileceğini belirler (kaynaklara VPC dışından erişilemez).

Route 53;
-Route 53 bir DNS sağlayıcısıdır, alan adlarını kaydedin ve yönetin, kayıt kümeleri oluşturun. Godaddy veya NameCheap'i düşünün
-Route 53, başka bir etki alanı kayıt kuruluşuna(domain registrar) (herhangi bir etki alanı) kayıtlı etki alanları için İnternet trafiğini yönlendirmek için kullanılabilir.
-Route 53, tüm kenar konumlarının(edge locations) yanında bulunur.
-Alias ​​kaydı, Route 53'e özel bir kayıt türüdür.
-Diğer ad kayıtları, barındırılan bölgenizdeki(hosted zone) kaynak kayıt kümelerini Amazon Elastic Load Balancing yük dengeleyicileri, Amazon CloudFront dağıtımları, AWS Elastic Beanstalk ortamları veya web siteleri olarak yapılandırılmış Amazon S3 bucketları ile eşlemek için kullanılır.
-Takma ad kayıtları(Alias ​​kaydı), bir DNS adını (ör. example.com) başka bir "hedef" DNS adıyla (ör. elb1234.elb.amazonaws.com) eşleyebildiğiniz için bir CNAME kaydı gibi çalışır.
-Basit Yönlendirme(Simple Routing) – Varsayılan yönlendirme politikası, birden fazla adres, rastgele bir uç nokta seçimiyle sonuçlanır
    Bir A kaydı, bir veya daha fazla IP adresiyle ilişkilendirilir.
    Sağlık kontrollerini desteklemez.
-Ağırlıklı Yönlendirme(Weighted Routing) – Trafiği, atanan farklı ağırlıklara (yüzdeler) göre ayırın
    Basite benzer ancak IP adresi başına bir ağırlık belirleyebilirsiniz.
    Aynı ada ve türe sahip kayıtlar oluşturur ve her kayda göreli bir ağırlık atarsınız.
    Bir IP'yi diğerine tercih eden sayısal değer.
    Bir kaynağa trafik göndermeyi durdurmak için kaydın ağırlığını 0 olarak değiştirebilirsiniz.
-Gecikme Tabanlı Yönlendirme(Latency-based Routing) – Kullanıcılar için olası en düşük gecikme süresi için trafiği bölgeye göre yönlendirir
    AWS, dünyanın farklı bölgelerinden bir gecikme veritabanı tutar.
    En düşük gecikme süresine sahip bölgeye yönlendirme yaparak performansı iyileştirmeye odaklanmıştır.
    Birden çok EC2 konumunda kaynaklarınız için gecikme kayıtları oluşturursunuz.
-Yük Devretme Yönlendirmesi(Failover Routing) – Bir konumda birincil site, diğerinde ikincil veri kurtarma sitesi. (sağlık kontrolünde değişiklik)
    İkincil bir IP adresine yük devretme.
    Sağlık kontrolü ile ilişkili.
    Aktif-pasif için kullanılır.
    Yalnızca kaynak sağlıklı olduğunda rotalar.
    ELB ile kullanılabilir.
    Diğer Ad(Alias records) kayıtlarıyla birlikte kullanıldığında, Hedef Sağlığı Değerlendir(Evaluate Target Health)'i "Evet" olarak ayarlayın ve durum denetimlerini kullanmayın.
-Coğrafi Konum Yönlendirme(Geolocation Routing) – Trafiği istek kaynağının coğrafi konumuna göre yönlendirin.
    Farklı ülkelerde ve farklı dillerde farklı kullanıcılara hitap eder.
    Belirli bir coğrafyadaki kullanıcıları içerir ve onlara özel ihtiyaçlarına göre özelleştirilmiş bir iş yükü sürümü sunar.
    Coğrafi konum, içeriği yerelleştirmek ve web sitenizin bir kısmını veya tamamını kullanıcılarınızın dilinde sunmak için kullanılabilir.
    Dağıtım haklarını da koruyabilir.
    Bölgeler arasında yükü eşit olarak dağıtmak için kullanılabilir.
    Çakışan bölgeler için birden fazla kaydınız varsa, Route 53 en küçük coğrafi bölgeye yönlendirecektir.
    Bir coğrafi konumla eşleşmeyen IP adresleri için varsayılan bir kayıt oluşturabilirsiniz.
-Coğrafi yakınlık Yönlendirme(Geo-proximity Routing) – Kaynakların konumuna göre trafiği yönlendirmek ve isteğe bağlı olarak trafiği bir konumdaki kaynaklardan başka bir konumdaki kaynaklara kaydırmak için kullanın.
-Trafik akışı(Traffic flow) – yönlendirme ilkelerini zincirlemek için görsel düzenleyici, kolay geri alma için ilke kayıtlarını doğrulayabilir. Global Trafik Yönetimi(Global Traffic Management) (GTM) hizmetleridir. Trafik akışı ilkeleri, yük devretme ve coğrafi konum gibi yönlendirme türlerini kullanarak kaynaklar için yönlendirme yapılandırmaları oluşturmanıza olanak tanır.
-AWS Alias ​​Record – AWS'nin akıllı DNS kaydı, AWS kaynakları için değişen IP'leri algılar ve otomatik olarak ayarlar
-Route53 Çözümleyici(Route53 Resolver) – DNS sorgularını VPC'leriniz ve ağınızın Hibrit Ortamları (şirket içi) arasında bölgesel olarak yönlendirmenize olanak tanır. Şirket içi DNS altyapınız ile AWS arasında Doğrudan Bağlantı-Direct Connect (DX) veya Sanal Özel Ağ-Virtual Private Network (VPN) aracılığıyla bağlantı kurulması gerekir.
-Uç noktaları izlemek için ve otomatik olarak durum kontrolleri(Health checks) oluşturulabilir. Diğer sağlık kontrollerini izleyerek sağlık kontrolleri yaptırabilirsiniz.

# AWS Lambda
-Lambda sunucusuz bir fonksiyondur. Kodunuzu yüklersiniz ve herhangi bir sunucuyu yönetmeden veya sağlamadan çalışır
-Lambda sunucusuzdur, yani uygulamanız hala sunucularda çalışır, ancak tüm sunucu yönetimi AWS tarafından yapılır.
-Lambda, işletim sistemi ortamını özelleştirmeniz gerekmeyen kısa süreli görevler için idealdir.  Uzun süreli görevlere (>15 dakika) ve özel bir işletim sistemi ortamına ihtiyacınız varsa Fargate kullanmayı düşünebilirsiniz.
-Lambda tarafından resmi olarak desteklenen 7 runtime language environment vardır: Ruby, Python, Java, NodeJs, C#, Powershell ve Go
-Çağrı (kullanılan bellek miktarı ve süresi) en yakın 100 milisaniyeye yuvarlanmış olarak ve talep miktarına göre ödersiniz. Aylık İlk 1 milyon istek ücretsizdir.
-Süre zaman aşımını 15 dakikaya kadar ve hafızayı 3008 MB'a kadar ayarlayabilirsiniz.
-Lambda'yı SDK'dan, API çağrılarından veya birden çok AWS hizmetinden tetikleyebilirsiniz, örn. S3, API Gateway, DynamoDB vb. veya Lambda bu AWS hizmetlerini tetikler.
-Lambda varsayılan olarak NO VPC de çalışır, Bazı hizmetlerle etkileşim kurmak için Lambda'nızın aynı VPC'de olması gerekir
-Lambda, saniyeler içinde 1000 eşzamanlı işleve ölçeklenebilir. (Varsayılan 1000'dir, AWS Service limit artışı ile artırabilirsiniz)
-Lambda'nın Soğuk Yıldızları(Cold Stars) var. Fonksiyon yakın zamanda yürütülmediyse, bir gecikme olacaktır.
-Fonksiyonlar şunlara erişebilir:
    AWS hizmetleri veya AWS dışı hizmetler.
    VPC'lerde çalışan AWS hizmetleri (ör. RedShift, Elasticache, RDS örnekleri).
    Bir AWS VPC'deki EC2 bulut sunucularında çalışan AWS dışı hizmetler.

Desteklenen AWS olay kaynakları şunları içerir:
Supported AWS event sources include:
Amazon S3.
Amazon DynamoDB.
Amazon Kinesis Data Streams.
Amazon Simple Notification Service.
Amazon Simple Email Service.
Amazon Simple Queue Service.
Amazon Cognito.
AWS CloudFormation.
Amazon CloudWatch Logs.
Amazon CloudWatch Events.
AWS CodeCommit.
Scheduled Events (powered by Amazon CloudWatch Events).
AWS Config.
Amazon Alexa.
Amazon Lex.
Amazon API Gateway.
AWS IoT Button.
Amazon CloudFront.
Amazon Kinesis Data Firehose.
Other Event Sources: Invoking a Lambda Function On Demand.

# API Gateway
-API Gateway, bulut ortamınızda her ölçekte güvenli API'ler oluşturmaya yönelik bir çözümdür
-Uygulamaların arka uç(back-end) hizmetlerinden verilere, iş mantığına veya işlevlere erişmesi için ön kapı görevi gören API'ler oluşturun
-API Gateway, API endpointleri saniyede 10.000 istekte kısıtlar(throttles) (AWS desteği aracılığıyla hizmet isteği yoluyla artırılabilir)
-API Gateway, Lambda ile birlikte AWS sunucusuz altyapısının uygulamaya dönük bölümünü oluşturur.
-CloudFront, API Gateway için genel uç nokta(public endpoint) olarak kullanılır.
-Aşamalar, API'nizin birden çok yayınlanmış sürümüne sahip olmanızı sağlar, örn. prod, staging, QA.
-Her aşamada, API'nizle etkileşim kurmak için kullandığınız uç nokta(endpoint) olan bir çağırma URL'si vardır.
-API trafiğinizin çoğunun nereden geldiğine bağlı olarak API endpoint türü, uç için optimize edilmiş(edge-optimized), bölgesel veya özel olabilir.
-Uç için optimize edilmiş(edge-optimized) bir API endpoint, coğrafi olarak dağıtılmış istemciler için en iyisidir. API istekleri, en yakın CloudFront Point of Presence'a (POP) yönlendirilir. Bu, API Gateway REST API'leri için varsayılan uç nokta türüdür.
-Bölgesel bir API Endpoint, aynı bölgedeki istemciler için tasarlanmıştır.
-Özel API endpoint, VPC'nizde oluşturduğunuz bir uç nokta ağ arabirimi (ENI) olan bir arabirim VPC uç noktası kullanılarak yalnızca Amazon Sanal Özel Bulutunuzdan (VPC) erişilebilen bir API endpointtir.
-Çağrı URL'niz için özel bir etki alanı(domain) kullanabilirsiniz, örn. api.exampro.com
-API'nizi dağıtım API'si aracılığıyla yayınlamanız gerekir. API'nizi yayınlamak istediğiniz aşamayı siz seçersiniz
-Kaynaklarınızda birden çok yöntem tanımladınız, örneğin GET, POST, DELETE
-CORS sorunları API Gateway ile ortaktır, CORS tüm bireysel uç noktalarda etkinleştirilebilir
-Önbelleğe alma, gecikmeyi iyileştirir ve uç noktanıza yapılan aramaların sayısını azaltır
-Aynı kaynak ilkeleri(origin policies), XSS saldırılarını önlemeye yardımcı olur
-Aynı kaynak politikaları(origin policies), postman veya curl gibi araçları yok sayar
-Javascript/AJAX ile çoklu etki alanı kullanımı için Kökenler Arası Kaynak Paylaşımı'nı(Cross-Origin Resource Sharing) (CORS) etkinleştirebilir. CORS her zaman istemci tarafından uygulanır.
-API'niz için AWS Cognito veya özel bir Lambda aracılığıyla yetkilendirme talep edebilirsiniz
-Amazon API Gateway, API çağrıları, gecikme ve hata oranları gibi (gerçek zamanlıya yakın) arka uç performans ölçümlerini CloudWatch'a kaydeder.
-Amazon API Gateway, REST API'lerinizdeki değişikliklerin denetlenebilir tam bir geçmişini sağlamak için AWS CloudTrail ile entegredir.
-Amazon API Gateway ile yalnızca API'leriniz kullanımdayken ödeme yaparsınız.
-Asgari ücret veya ön taahhüt yoktur.
-API Gateway, API'lerin oluşturulmasına ve yönetilmesine yardımcı olan çeşitli özellikler sağlar:
    Ölçüm(Metering) – Üçüncü taraf geliştiricilerin API'lere erişimini ölçen ve kısıtlayan planları tanımlayın.
    Güvenlik(Security) – API Gateway, API'lere erişimi yetkilendirmek ve hizmet operasyon erişimini kontrol etmek için birden çok araç sağlar.
    Esneklik(Resiliency) – Arka uç operasyonlarının ani trafik artışlarına dayanabilmesi için trafiği azaltma ile yönetin.
    Operasyon İzleme(Operations Monitoring) – API Ağ Geçidi, hizmetlere yapılan çağrıları izlemek için bir ölçüm panosu sağlar.
    Yaşam Döngüsü Yönetimi(Lifecycle Management) – Mevcut uygulamaların yeni API sürümleri yayınlandıktan sonra önceki sürümleri çağırmaya devam edebilmesi için birden çok API sürümünü ve her sürüm için birden çok aşamayı aynı anda çalıştırın.

## CloudWatch
-Cloudwatch, bir izleme hizmetleri koleksiyonudur. Gösterge Tabloları, Olaylar, Alarmlar, Günlükler ve Metriklere sahiptir(Dashboards, Events, Alarms, Logs, and Metrics)
-Cloudwatch Günlükleri-Cloudwatch Logs: AWS hizmetlerinden gelen verileri günlüğe kaydedin. Örneğin. CPU kullanımı
-Cloudwatch Metrikleri-Metrics: Zamana göre sıralanmış veri noktaları kümesini temsil eder. İzlenecek bir değişken, örn. Zaman içinde CPU kullanımı
-Cloudwatch Olayları-Events: Bir koşula dayalı olarak bir olayı tetikleyin, örn. her saat sunucunun anlık görüntüsünü alın
-Cloudwatch Alarmları-Alarms: Tanımlanmış bir eşik aşıldığında ölçümlere dayalı olarak bildirimi tetikler
-Cloudwatch Panoları-Dashboards: Metriklere dayalı görselleştirme oluşturun
-EC2, 5 dakikalık aralıklarla ve Ayrıntılı İzleme 1 dakikalık aralıklarla izler
-Diğer servislerin çoğu 1,3,5 dakikalık aralıklarla 1 dakikalık aralıklarla izler
-Günlükler bir Günlük Grubuna(Log Group) ait olmalıdır
-Bellek Kullanımını ve disk boyutunu izlemek için Cloudwatch Agent'ın EC2 ana bilgisayarına yüklenmesi gerekir
-Özel günlük dosyalarını aktarabilirsiniz, örn. production logs
-Özel metrikler, yüksek çözünürlüklü metrikleri 1 saniyeye kadar bir alt dakika aralığında izlemenize olanak tanır.

## Cloudtrail
-AWS CloudTrail, hesabınızda yapılan etkinlikleri kaydeden bir web hizmetidir.
-Yönetişim, uyumluluk, operasyonel denetim ve risk denetimi, Cloudtrail ile ilgili anahtar kelimelerdir(Governance, compliance, operational auditing, and risk auditing)
-Kimin ne yapacağını bilmeniz gerektiğinde Cloudtrail'i düşünün
-Cloudtrail, varsayılan olarak, Etkinlik Geçmişi aracılığıyla son 90 günün olay verilerini günlüğe kaydeder
-90 günden sonrasını takip etmek için İz(trail) oluşturmanız gerekir
-Günlüklerin kurcalanmadığından emin olmak için Günlük Dosyası Doğrulamayı(Log File Validation) açmanız gerekir.
-Cloudtrail günlükleri, KMS (Anahtar Yönetim Hizmeti) kullanılarak şifrelenebilir
-Cloudtrail, bir Kuruluştaki tüm AWS hesaplarında ve bir hesaptaki tüm bölgelerde oturum açacak şekilde ayarlanabilir
-Cloudtrail günlükleri, Cloudwatch günlüklerine aktarılabilir
-Ek güvenlik için SSE KMS'yi kullanarak şifrelemeyi de etkinleştirebilirsiniz.
-İzler(trails), belirttiğiniz bir S3 kovasında çıkar.
-CloudTrail günlük dosyaları, S3 Sunucu Tarafı Şifreleme(Server Side Encryption) (SSE) kullanılarak şifrelenir.
-Cloudtrail iki tür olayı günlüğe kaydeder: Yönetim Olayları ve Veri olayları
-Yönetim olayları, AWS hesabınızdaki kaynaklar üzerinde gerçekleştirilen yönetim işlemlerine ilişkin öngörü sağlar. Bunlar aynı zamanda control plane işlemleri olarak da bilinir. Yönetim olayları, hesabınızda meydana gelen API dışı olayları da içerebilir.
-Veri Olayları(Data Events), bir kaynak üzerinde veya içinde gerçekleştirilen kaynak işlemlerine ilişkin içgörü sağlar. Bunlar aynı zamanda data plane işlemleri olarak da bilinir.
-Bir İz oluştururken Veri Olayları varsayılan olarak devre dışı bırakılır
-S3'teki iz(trail) günlükleri Athena kullanılarak analiz edilebilir

# Cloudwatch vs Cloudtrail
-Performans izleme için Cloudwatch; denetim(audit) için, Cloudtrail
-AWS hizmetlerinde olayları günlüğe kaydedin – operasyonları için Cloudwatch'ı düşünün; AWS hizmetlerinde API etkinliğini günlüğe kaydedin - hesap etkinlikleri için Cloudtrail düşünün
-Üst düzey kapsamlı izleme ve olay oluşturma için Cloudwatch; daha düşük seviyeli granüler, Cloudtrail için
-Cloudwatch nasıl(how), Cloudtrail kim(who) sorar.

## AWS Config
-AWS Config, güvenlik ve yönetişimi etkinleştirmek için size bir AWS kaynak envanteri, yapılandırma geçmişi ve yapılandırma değişikliği bildirimleri sağlayan tam olarak yönetilen(fully-managed) bir hizmettir.
-AWS Config ile mevcut AWS kaynaklarını keşfedebilir, tüm yapılandırma ayrıntılarıyla birlikte AWS kaynaklarınızın eksiksiz bir envanterini dışa aktarabilir ve herhangi bir zamanda bir kaynağın nasıl yapılandırıldığını belirleyebilirsiniz.
-Bu yetenekler, uyumluluk denetimi, güvenlik analizi, kaynak değişikliği takibi ve sorun gidermeyi mümkün kılar.
-AWS kaynaklarınızın yapılandırmalarını belirlemenize, denetlemenize ve değerlendirmenize olanak tanır.
-Çeşitli yapılandırma ayarları ve dosyalarından oluşan bir temel oluşturur ve ardından bu temele göre varyasyonları izleyebilir.
-AWS CloudTrail, hesabınızdaki kullanıcı API etkinliğini kaydeder ve bu etkinlikle ilgili bilgilere erişmenize olanak tanır. Ancak AWS Config, AWS kaynaklarınız için belirli bir zamanda yapılandırma ayrıntılarını Yapılandırma Öğeleri(Configuration Items) (CI'ler) olarak kaydeder.
-Şu soruyu yanıtlamak için bir AWS Config kullanabilirsiniz. AWS kaynağım, zaman içinde bir noktada neye benziyordu? Ancak, bu kaynağı değiştirmek için Kimin API çağrısı yaptığını yanıtlamak için AWS CloudTrail'i kullanabilirsiniz.

## AWS OpsWorks
-AWS OpsWorks, çok popüler otomasyon platformlarının Chef, Puppet ve Ansible ağacının yönetilen(managed) instancelarını sağlayan bir yapılandırma yönetimi hizmetidir.
-Uygulamaların nasıl yapılandırıldığını, dağıtıldığını ve yönetildiğini otomatikleştirir.
-Kodu dağıtmak, görevleri otomatikleştirmek, instanceları yapılandırmak, yükseltmeleri gerçekleştirmek vb. için yapılandırma yönetimi sağlayın.
-OpsWorks, Amazon EC2 bulut sunucularınız veya şirket içi bilgi işlem ortamlarınız genelinde sunucuların nasıl yapılandırıldığını, dağıtıldığını ve yönetildiğini otomatikleştirmek için Chef and Puppet'ı kullanmanıza olanak tanır.
-OpsWorks, altyapıyı koda dönüştüren bir otomasyon platformudur.
-OpsWorks, Yığınlar(Stacks) ve Katmanlardan(Layers) oluşur:
    Yığın, bir hizmeti veya uygulamayı desteklemek için gereken kaynak koleksiyonlarıdır.
    Yığınlar, toplu olarak yönetmek istediğiniz kaynak kapsayıcılarıdır (EC2, RDS vb.).
    Her Yığın bir veya daha fazla Katman içerir ve Katmanlar, paketlerin dağıtımını otomatikleştirir.
    Yığınlar klonlanabilir - ancak yalnızca aynı bölge içinde.
    Katmanlar, uygulama teslim hiyerarşisinin farklı bileşenlerini temsil eder.
    EC2 bulut sunucuları, RDS bulut sunucuları ve ELBS, Katman örnekleridir.
-OpsWorks küresel bir hizmettir. Ancak bir yığın oluşturduğunuzda, bir bölge belirtmelisiniz ve bu yığın yalnızca o bölgedeki kaynakları kontrol edebilir.

## AWS System Manager
-AWS Systems Manager, birden çok AWS hizmetinden alınan operasyonel verileri merkezileştirmenize ve AWS kaynaklarınız genelinde görevleri otomatikleştirmenize olanak tanır.
-Uygulamalar, bir uygulama yığınının farklı katmanları veya productiona karşı geliştirme ortamları gibi mantıksal kaynak grupları oluşturabilirsiniz.
-Systems Manager ile bir kaynak grubu seçebilir ve son API etkinliğini, kaynak yapılandırma değişikliklerini, ilgili bildirimleri, operasyonel uyarıları, yazılım envanterini ve yama uyumluluğu durumunu görüntüleyebilirsiniz.
-Systems Manager, AWS kaynaklarınızı görüntülemek ve yönetmek için merkezi bir yer sağlar, böylece operasyonlarınız üzerinde tam bir görünürlük ve kontrole sahip olabilirsiniz.
-SSM Aracısı, Linux ve Windows için AWS tarafından sağlanan en son temel AMI'lere varsayılan olarak yüklenir.
-AWS tabanlı ve şirket içi tabanlı sistemleri aracı aracılığıyla yönetir.
-Bulut sunucularınız ve üzerlerinde yüklü olan yazılımlar hakkında bilgi toplayarak sistem yapılandırmalarınızı ve yüklü uygulamalarınızı anlamanıza yardımcı olur.
-Yönetilen instancelarınızı yama uyumluluğu ve yapılandırma tutarsızlıkları açısından taramanıza olanak tanır.
-AWS kaynakları genelinde yaygın ve tekrarlayan BT operasyonlarını ve yönetim görevlerini güvenli bir şekilde otomatikleştirmenize olanak tanır.
-Sunucularınızda oturum açmadan, bastion host, SSH veya PowerShell'e olan ihtiyacın yerini alarak, bulut sunucularınızın güvenli ve güvenli uzaktan yönetimini sağlar.
-Büyük Amazon EC2 grupları veya şirket içi bulut sunucuları arasında bir işletim sistemi ve yazılım yamalarını otomatik olarak seçip dağıtmanıza yardımcı olur.
-Instancelarınız genelinde yönetim ve bakım görevlerini çalıştırmak için zaman aralıkları planlamanıza olanak tanır.
-Dağıtıcı, yazılım paketlerini kuruluşunuzda güvenli bir şekilde depolamanıza ve dağıtmanıza olanak tanıyan bir AWS Systems Manager özelliğidir.
-Veritabanı dizeleri gibi düz metin verileri veya parolalar gibi gizli bilgiler olsun, yapılandırma verilerinizi yönetmek için merkezi bir depo sağlar.
-Sınavda secretlarınızı, şifrelerinizi hangi aws ortamında depolarsınız sorusunun cevabı

## AWS Trusted Advisor
-Trusted Advisor, sistem performansı, para tasarrufu, kullanılabilirlik ve güvenlik açıklarını kapatmak için önerilerde bulunmak için AWS ortamını inceler Trusted Advisor aşağıdaki dört kategoriyi kontrol eder
-Maliyet Optimizasyonu-Cost Optimization
    Faturanızı azaltmak için kullanılmayan kaynakları ve fırsatları vurgulayarak potansiyel olarak tasarruf edebilecek öneriler.
-Güvenlik-Security
    AWS çözümünü daha az güvenli hale getirebilecek en iyi uygulamalar doğrultusunda güvenlik ayarlarının ve boşlukların belirlenmesi
-Hata Toleransı-Fault Tolerance
    Yedeklilik eksikliklerini, mevcut hizmet sınırlarını ve aşırı kullanılan kaynakları vurgulayarak AWS çözümünün esnekliğini ve kullanılabilirliğini artırmaya yardımcı olan öneriler.
-Verim-Performance
    Uygulamaların hızını ve yanıt verme hızını artırmaya yardımcı olabilecek öneriler
-Hizmet Sınırları-Service Limits
    Hizmet sınırının %80'inden fazla olan hizmet kullanımını kontrol eder.
    Değerler anlık görüntüye dayalıdır, bu nedenle mevcut kullanım farklı olabilir.
    Limit ve kullanım verilerinin herhangi bir değişikliği yansıtması 24 saati bulabilir

## AWS Organizations
-AWS Organizations, AWS'de büyüdükçe ve iş yüklerinizi ölçekledikçe ortamınızı merkezi olarak yönetmenize yardımcı olur.
-Organizasyon, faturayı merkezi olarak yönetmenize yardımcı olur; erişimi, uyumluluğu ve güvenliği kontrol edin; ve kaynakları AWS hesaplarınız arasında paylaşın.
-AWS Organizations'ı kullanarak hesap oluşturmayı otomatikleştirebilir, iş ihtiyaçlarınızı yansıtmak için hesap grupları oluşturabilir ve yönetişim için bu gruplara politikalar uygulayabilirsiniz.
-Ayrıca tüm AWS hesaplarınız için tek bir ödeme yöntemi ayarlayarak faturalandırmayı basitleştirebilirsiniz. Consolidated Billing
-Diğer AWS hizmetleriyle entegrasyonlar aracılığıyla, kuruluşunuzdaki hesaplar arasında merkezi yapılandırmaları ve kaynak paylaşımını tanımlamak için Organizations kullanabilirsiniz.
-AWS Organizations, tüm AWS müşterilerine ek ücret ödemeden sunulur.
-İki özellik setinde mevcuttur; Konsolide faturalandırma ve Tüm özellikler.(Consolidated billing and All features)
-Varsayılan olarak, Organizations birleştirilmiş faturalandırma özelliklerini destekler.
-Birleştirilmiş faturalandırma ile, tüm hesaplarınızdan kaynaklanan masrafların birleşik bir görünümünü görebilirsiniz.
-Amazon EC2 ve Amazon S3 için toplu indirimler gibi toplu kullanımdan sağlanan fiyatlandırma avantajlarından da yararlanabilir.
-Hacim indirimleri yoluyla maliyet kontrolüne yardımcı olabilir.
-Hesaplar Organizations arasında taşınabilir.
-Hem üye hem de ana hesaplara kök-root veya IAM erişiminiz olmalıdır.
-Yalnızca birkaç hesap için AWS Organizations konsolunu kullanın.
-Taşınacak çok sayıda hesap varsa AWS Organizations API'sini veya AWS Komut Satırı Arabirimi'ni (AWS CLI) kullanın.
-AWS kaynaklarınızı düzenlemek için kaynak gruplarını kullanabilirsiniz.
-Kaynak grupları, aynı anda çok sayıda kaynak üzerindeki görevleri yönetmeyi ve otomatikleştirmeyi kolaylaştırır.

## AWS Resource Access Manager
-AWS Resource Access Manager (RAM), AWS kaynaklarını herhangi bir AWS hesabıyla veya AWS Kuruluşunuz içinde kolayca ve güvenli bir şekilde paylaşmanızı sağlayan bir hizmettir.
-AWS Transit Gateway'leri, Alt Ağları, AWS License Manager yapılandırmalarını ve Amazon Route 53 Resolver kural kaynaklarını RAM ile paylaşabilirsiniz.
-RAM, birden fazla hesapta yinelenen kaynaklar oluşturma ihtiyacını ortadan kaldırarak, sahip olduğunuz her bir hesapta bu kaynakları yönetmenin operasyonel yükünü azaltır.
-Çok hesaplı bir ortamda merkezi olarak kaynaklar oluşturabilir ve bu kaynakları üç basit adımda hesaplar arasında paylaşmak için RAM'i kullanabilirsiniz:
Temel faydalar:
    -Operasyonel Yükü Azaltın– AWS kaynaklarını merkezi olarak tedarik edin ve alt ağlar veya Lisans Yöneticisi(License Manager) yapılandırmaları gibi kaynakları diğer hesaplarla paylaşmak için RAM kullanın. Bu, çok hesaplı bir ortamda her hesapta yinelenen kaynaklar sağlama ihtiyacını ortadan kaldırır.
    -Güvenliği ve Görünürlüğü İyileştirin – RAM, paylaşılan kaynakların tüketimini yönetmek için AWS Identity and Access Management'ta (IAM) ayarlanan mevcut ilkelerden ve izinlerden yararlanır. RAM ayrıca Amazon CloudWatch ve AWS CloudTrail ile entegrasyon yoluyla alarm ayarlamak ve günlükleri görselleştirmek için paylaşılan kaynaklara kapsamlı görünürlük sağlar.
    -Maliyetleri Optimize Edin – AWS License Manager yapılandırmaları gibi kaynakları hesaplar arasında paylaşmak, kullanımı artırmak ve maliyetleri optimize etmek için şirketinizin birden çok bölümündeki lisanslardan yararlanmanıza olanak tanır.

## Migration
# AWS Snowball
-AWS'ye veya AWS'den veri aktarımı için veri taşıma çözümünü ölçeklendirin.
-Snowball ve Snowball Edge, bir depolama aygıtı içeren sağlam bir kaptır.
-Snowball ve Snowball Edge peta ölçekli geçiş içindir. Snowmobile, eksabayt ölçeğinde geçiş içindir
-Düşük Maliyet: 100 TB'ı yüksek hızlı internet üzerinden aktarmak için binlerce dolar, Snowball ile 1/5'i
-Yüksek hızlı internet üzerinden 100 TB'ı 100 günde hızlandırın, Snowball bir haftadan az sürer
-AWS Snowball Client, yerel bir bilgisayara yüklenen ve verileri tanımlamak, sıkıştırmak, şifrelemek ve aktarmak için kullanılan bir yazılımdır.
-256 bit şifreleme (AWS KMS ile yönetilir) ve TPM ile kurcalanmaya karşı korumalı(tamper-resistant) kasalar kullanır.
-Snowball aynı bölgeden sipariş edilmeli ve aynı bölgeden iade edilmelidir.
-Veri aktarımını hızlandırmak için AWS Snowball Client'ın eş zamanlı instancelarını birden çok terminalde çalıştırmanız ve küçük dosyaları toplu olarak aktarmanız önerilir.
-Snowball, S3'e (ayrıca Glacier) içe aktarabilir veya S3'ten dışa aktarabilir.
-Snowball iki boyutta gelir:
    50 TB (42 TB kullanım alanı)
    80 TB ( 72 TB kullanım alanı)
-Snowmobile tek boyutta gelir: 100 PB
-Snowball veya Snowmobile kullanarak verileri hem dışa hem de içe aktarabilirsiniz.
-Snowball Edge, yerel işleme ve uç bilgi işlem iş yüklerini üstlenebilir
-Snowball Edge, 5 ila 10 cihazlık gruplar halinde bir kümede kullanılabilir

*** 27-Comparising Snow family görseli

<img width="712" alt="Comparising Snow family" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/27-Comparising%20Snow%20family.JPG">

# AWS Database Migration Service
-AWS Database Migration Service (DMS), veritabanlarını AWS'ye hızlı ve güvenli bir şekilde geçirmenize yardımcı olur.
-Kaynak veritabanı, geçiş sırasında tam olarak çalışır durumda kalır ve veritabanına bağlı olan uygulamaların kapalı kalma süresini en aza indirir.
-AWS Database Migration Service, verilerinizi en yaygın olarak kullanılan ticari ve açık kaynaklı veritabanlarına ve bu veritabanlarından geçirebilir.
-Desteklenen geçiş yolları şunları içerir:
    Şirket içi ve EC2 veritabanlarından Amazon RDS veya Amazon Aurora'ya.
    Oracle'dan Oracle'a gibi homojen geçişler.
    Oracle veya Microsoft SQL Server gibi farklı veritabanı platformları arasında Amazon Aurora'ya heterojen geçişler.
-AWS Database Migration Service ile verilerinizi sürekli olarak yüksek erişilebilirlikle çoğaltabilir ve Amazon Redshift ve Amazon S3'e veri akışı yaparak veritabanlarını petabayt ölçeğinde bir veri ambarında birleştirebilirsiniz.
-Veritabanlarını Amazon Aurora, Amazon Redshift, Amazon DynamoDB veya Amazon DocumentDB'ye (MongoDB uyumluluğu ile) taşırken DMS'yi altı ay boyunca ücretsiz kullanabilirsiniz.
-Veritabanlarını AWS RDS veya EC2 tabanlı veritabanlarına geçirmek için Schema Conversion Tool (SCT) ile birlikte kullanın.
-AWS Database Migration Service, verilerinizi en yaygın olarak kullanılan ticari ve açık kaynaklı veritabanlarına ve bu veritabanlarından geçirebilir.
-Schema Conversion Tool, homojen geçişler (aynı veritabanı) için veritabanı şemalarını kopyalayabilir ve heterojen geçişler (farklı veritabanları) için şemaları dönüştürebilir.
-DMS, daha küçük, daha basit dönüşümler için kullanılır ve ayrıca MongoDB ve DynamoDB'yi destekler.
-SCT, veri ambarları gibi daha büyük, daha karmaşık veri kümeleri için kullanılır.
-DMS, şirket içi AWS'ye veya Snowball veya S3'e çoğaltma işlevlerine sahiptir.

# AWS DataSync
-AWS DataSync, büyük miktarda veriyi şirket içi depolama ile Amazon S3 veya Amazon Elastic File System (Amazon EFS) arasında çevrimiçi olarak taşımayı basit ve hızlı hale getirir.
-Veri aktarımlarıyla ilgili manuel görevler, geçişleri yavaşlatabilir ve BT operasyonlarına yük getirebilir.
-DataSync, kopyalama işlerini komut dosyası oluşturma, aktarımları zamanlama ve izleme, verileri doğrulama ve ağ kullanımını optimize etme dahil olmak üzere bu görevlerin çoğunu ortadan kaldırır veya otomatik olarak gerçekleştirir.
-DataSync yazılım aracısı, Ağ Dosya Sisteminize(Network File System) (NFS) ve Sunucu İleti Bloğu(Server Message Block) (SMB) depolamanıza bağlanır, böylece uygulamalarınızı değiştirmeniz gerekmez.
-DataSync, internet veya AWS Direct Connect bağlantıları üzerinden yüzlerce terabayt ve milyonlarca dosyayı aktarabilir.
-Aktif veri kümelerini veya arşivleri AWS'ye geçirmek, verileri zamanında analiz ve işleme için buluta aktarmak veya iş sürekliliği için verileri AWS'ye çoğaltmak için DataSync'i kullanabilirsiniz.
-DataSync, Ağ Dosya Sistemi (NFS) veya Sunucu İleti Bloğu (SMB) dosya sunucuları, tüm Amazon Simple Storage Service (Amazon S3) depolama sınıfları ve Amazon Elastic File System (Amazon EFS) dosya sistemleri arasında veri kopyalayabilir.
-Tüm veriler, Aktarım Katmanı Güvenliği(Transport Layer Security) (TLS) ile aktarım sırasında şifrelenir.
-DataSync, Amazon S3-Managed Encryption Keys (SSE-S3) kullanılarak S3 bucketları için varsayılan şifrelemenin kullanılmasını ve duran verilerin Amazon EFS dosya sistemi şifrelemesini(encryption of data at rest) destekler.
-Görev planlama, kaynak depolama sisteminizden hedefe değişiklikleri algılamak ve kopyalamak için periyodik olarak bir görevi yürütmeyi yapılandırmanıza olanak tanır.
-AWS DataSync Konsolu veya AWS Komut Satırı Arabirimi'ni (CLI) kullanarak, tekrarlanan aktarımları yönetmek için komut dosyaları yazmaya ve çalıştırmaya gerek kalmadan görevlerinizi zamanlayabilirsiniz.
-DataSync aracısı(agent), endüstri standardı NFS ve SMB protokollerini kullanarak mevcut depolama sistemlerinize bağlanır.
-Aracı-agent, verileri hızla aktarır ve belirlediğiniz Amazon S3 klasörünüze veya Amazon EFS dosya sisteminize yatırır.
-DataSync, verileri Amazon S3'e kopyalarken, her dosyayı otomatik olarak 1:1 ilişki içinde tek bir S3 nesnesine dönüştürür ve POSIX meta verilerini Amazon S3 nesne meta verileri olarak korur.
-Dosya sistemi meta verilerini içeren nesneleri dosya biçimlerine geri kopyaladığınızda, DataSync'in S3'e kopyaladığı orijinal dosya meta verileri geri yüklenir.
-Benzer şekilde, verileriniz için hedef Amazon EFS olduğunda, DataSync mevcut dizin yapılarını ve dosya meta verilerini korur.
-DataSync, dosyaları doğrudan Amazon VPC'nize taşımak için VPC uç noktalarını-VPC endpoints (AWS PrivateLink tarafından desteklenir) destekler.
-Aşağıdaki şema, AWS DataSync'in nasıl çalıştığını gösterir:

*** 28-AWS Datasync görseli

<img width="912" alt="AWS Datasync" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/28-AWS%20Datasync.JPG">

# AWS Server Migration Service (SMS)
-AWS Server Migration Service (SMS), binlerce şirket içi iş yükünü AWS'ye geçirmenizi kolaylaştıran ve hızlandıran aracısız(agent-less) bir hizmettir.
-AWS SMS, canlı sunucu birimlerinin artımlı çoğaltmalarını otomatikleştirmenize, zamanlamanıza ve izlemenize olanak tanıyarak büyük ölçekli sunucu geçişlerini koordine etmenizi kolaylaştırır.
-Şirket içi VMware vSphere veya Microsoft Hyper-V/SCVMM sanal makinelerinin AWS'ye geçişini otomatikleştirir.
-Sanal makineleri AWS'ye çoğaltır, birimleri eşitler ve periyodik AMI'ler oluşturur.
-Sanal makineleri aşamalı olarak eşitleyerek kesinti süresini en aza indirir.
-Yalnızca Windows ve Linux VM'lerini destekler (tıpkı AWS gibi)

## AWS Elastic Transcoder
-Amazon Elastic Transcoder, geliştiricilerin ve işletmelerin video ve ses dosyalarını kaynak biçimlerinden akıllı telefonlar, tabletler ve bilgisayarlar için dönüştürür.
-Çok çeşitli giriş ve çıkış formatlarını, çözünürlükleri, bit hızlarını ve kare hızlarını destekler.
-Ayrıca otomatik video bit hızı optimizasyonu, küçük resimler oluşturma, görsel filigranların üst üste bindirilmesi, altyazı desteği, DRM paketleme, aşamalı indirmeler, şifreleme ve daha fazlası için özellikler sunar.
-Dosyaları bir giriş S3 klasöründen alır ve çıktıyı bir çıkış S3 klasörüne kaydeder.
-Bir JSON API kullanır ve Python, Node.js, Java, .NET, PHP ve Ruby için SDK'lar sağlanır.
-Popüler formatlar için kod dönüştürme hazır ayarları sağlar.
-İçeriğin süresine ve medyanın çözünürlüğüne veya biçimine göre ücretlendirilirsiniz.

*** 29-Elastic Transcoder görseli

<img width="912" alt="Elastic Transcoder" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/29-Elastic%20Transcoder.JPG">

# AWS Kinesis
-Amazon Kinesis, bulutta akış verilerini toplamaya, işlemeye ve analiz etmeye yönelik AWS çözümüdür. “REAL TIME” ile karşılaştığınızda Kinesis'i düşünün
-Veriler "parçalar-shards" halinde işlenir - her parça saniyede 1000 kayıt alabilir.
-Dört tür Kinesis hizmeti vardır; Kinesis Data Streams, Kinesis Firehose, Kinesis Video Streams, Kinesis Data Analytics.
-Kinesis Data Streams, özel ihtiyaçlar için akış verilerini işleyen veya analiz eden özel uygulamalar oluşturmanıza olanak tanır. Kinesis Data Streams, büyük veri akışının gerçek zamanlı olarak işlenmesini sağlar. Veri üreticilerinden hızlı bir şekilde veri taşımak ve ardından verileri işlemeye devam etmek için kullanışlıdır.
-Kullanım örneği: Hızlandırılmış günlük ve veri akışı alımı, gerçek zamanlı ölçümler ve raporlama, gerçek zamanlı veri analitiği, karmaşık akış işleme.
-Kinesis Firehose, akış verilerini veri depolarına ve analiz araçlarına yüklemenin en kolay yoludur.
-Akış verilerini yakalar, dönüştürür ve yükler.
-Mevcut iş zekası araçları ve gösterge tabloları ile gerçek zamanlıya yakın analitik sağlar.
-Kinesis Data Streams, Kinesis Data Firehose için kaynak(lar) olarak kullanılabilir.
-Firehose Hedefleri arasında S3, Reshift, Elastisearch veya Splunk bulunur (Sınavda sorulabilir)
-Kinesis Data Analytics, gerçek zamanlı, akış verilerini işlemenin ve analiz etmenin en kolay yoludur. Kinesis Data Streamsi işlemek için standart SQL sorguları olarak kullanılabilir.
-Sorguları gerçek zamanlı olarak gerçekleştirmenizi sağlar. Giriş ve çıkış olarak bir Kinesis Data Streams/Firehose gerekir
-Kullanım örnekleri: Zaman serisi analizleri oluşturun, gerçek zamanlı gösterge tablolarını besleyin, gerçek zamanlı uyarılar ve bildirimler oluşturun.
-Kinesis Video Analytics, analitik, makine öğrenimi (ML) ve diğer işlemler için bağlı cihazlardan AWS'ye güvenli bir şekilde video akışını kolaylaştırır.
-Makine öğrenimi ve video işlemeyi uygulamak için SageMaker, Recognition veya diğer hizmetler gibi tüketicilere video ve ses kodlu verileri güvenli bir şekilde alın ve depolayın

# Amazon EMR
-Amazon Elastic Map Reduce(EMR), işletmelerin, araştırmacıların, veri analistlerinin ve geliştiricilerin büyük miktarda veriyi kolayca ve uygun maliyetli bir şekilde işlemesini sağlayan bir web hizmetidir.
-EMR, Amazon EC2 ve Amazon S3 üzerinde çalışan barındırılan bir Hadoop çerçevesi olarak kullanılır.
-Büyük miktarda veriyi işlemek için yönetilen Hadoop çerçevesi.
-Ayrıca Apache Spark, HBase, Presto ve Flink'i de destekler.
-En yaygın olarak günlük-log analizi, finansal analiz veya ayıklama, tercüme ve yükleme(extract, transform, and load) (ETL) faaliyetleri için kullanılır.
-Küme, Adımlarınızı-Steps çalıştırmak için EMR tarafından sağlanan bir EC2 bulut sunucusu (belki yüz) koleksiyonudur.
-EMR, bellek içi önbelleğe alma ve optimize edilmiş sorgu yürütme kullanan büyük veri iş yükleri için kullanılan açık kaynaklı dağıtılmış bir işlem olan Apache Spark'ı dağıtmak için iyi bir yerdir.
-EMR, aynı Amazon EC2 Erişilebilirlik Alanında-AZ belirli bir küme-cluster için tüm düğümleri-nodes başlatır.
-AWS günlüklerini-logs alıp analiz etmek isterlerse, EMR'yi düşünün.

# Amazon Glue
-AWS Glue, analitik için zaman alan veri hazırlama adımlarını otomatikleştiren, tamamen yönetilen, kullandıkça öde, ayıkla, dönüştür ve yükle(extract, transform, and load) (ETL) hizmetidir.
-AWS Glue, Glue Veri Kataloğu(Glue Data Catalog) aracılığıyla verileri otomatik olarak keşfeder ve profillerini oluşturur, kaynak verilerinizi hedef şemalara dönüştürmek için ETL kodu önerir ve oluşturur.
-AWS Glue, verilerinizi hedefine yüklemek için ETL işlerini tam olarak yönetilen(fully-managed), ölçeği genişletilebilir bir Apache Spark ortamında çalıştırır.
-AWS Glue ayrıca karmaşık veri akışlarını ayarlamanıza, düzenlemenize ve izlemenize olanak tanır.
-AWS Management Console'da birkaç tıklamayla bir ETL işi oluşturabilir ve çalıştırabilirsiniz.
-AWS Glue'u AWS'de depolanan verilerinize yönlendirmeniz yeterlidir; AWS Glue verileri keşfeder ve ilişkili meta verileri (ör. tablo tanımı ve şema) AWS Glue Veri Kataloğu'nda depolar.
-AWS Glue tarayıcıları(crawlers) bir kaynak veya hedef veri deposuna bağlanır, verilerin şemasını belirlemek için öncelikli bir sınıflandırıcı listesinde ilerler ve ardından AWS Glue Veri Kataloğu'nda meta veriler oluşturur.
-AWS Glue, veri tekilleştirme ve eşleşen kayıtları bulmak için FindMatch adlı bir Makine Öğrenimi Dönüşümü sağlayarak verilerin temizlenmesine ve analize hazırlanmasına yardımcı olur.
-Kullanım Durumları:
    -Verilerin özelliklerini keşfetmek, dönüştürmek ve analitik için hazırlamak için AWS Glue kullanın.
    -Glue, Amazon S3'teki veri göllerinde(data lake), Amazon Redshift'teki veri ambarlarında ve AWS üzerinde çalışan çeşitli veritabanlarında depolanan hem yapılandırılmış hem de yarı yapılandırılmış verileri otomatik olarak keşfedebilir.
    -Amazon Athena, Amazon EMR ve Amazon Redshift Spectrum gibi hizmetleri kullanarak ETL, sorgulama ve raporlama için kullanılabilen Glue Data Catalog aracılığıyla verilerin birleşik bir görünümünü sağlar.
    -Glue, zaten aşina olduğunuz araçları kullanarak daha fazla özelleştirebileceğiniz ETL işleri için otomatik olarak Scala veya Python kodu oluşturur.

# AWS Athena
-Amazon Athena, standart SQL kullanarak Amazon S3'teki verileri analiz etmeyi kolaylaştıran etkileşimli bir sorgu hizmetidir.
-Athena sunucusuzdur, bu nedenle yönetilecek bir altyapı yoktur ve yalnızca çalıştırdığınız sorgular için ödeme yaparsınız.
-Athena'nın kullanımı kolaydır; Amazon S3'te verilerinizin üzerine gelin, şemayı tanımlayın ve standart SQL kullanarak sorgulamaya başlayın.
-Amazon Athena, Presto'yu tam standart SQL desteğiyle kullanır ve CSV, JSON, ORC, Apache Parquet ve Avro gibi çeşitli standart veri biçimleriyle çalışır.
-Amazon Athena, Amazon S3'te depolanan verileriniz için oluşturduğunuz veritabanları ve tablolarla ilgili bilgileri ve şemaları depolamak için yönetilen bir Veri Kataloğu(Data Catalog) kullanır.
-Athena, sorguları otomatik olarak paralel olarak yürütür, böylece büyük veri kümelerinde bile sorgu sonuçlarını saniyeler içinde alırsınız.
-Kullanım Durumlarını Karşılaştırın:
    -Amazon Redshift, özellikle birden çok birleştirme ve alt sorgu ile son derece karmaşık SQL içerenler olmak üzere kurumsal raporlama ve iş zekası iş yükleri için en hızlı sorgu performansını sağlar.
    -Amazon EMR, şirket içi dağıtımlara kıyasla Hadoop, Spark ve Presto gibi yüksek düzeyde dağıtılmış işleme çerçevelerini çalıştırmayı basit ve uygun maliyetli hale getirir. Amazon EMR esnektir; analitik gereksinimlerinizi optimize etmek için özel uygulamalar ve kod çalıştırabilir ve belirli bilgi işlem, bellek, depolama ve uygulama parametreleri tanımlayabilirsiniz.
    -Amazon Athena, herhangi bir sunucu kurmaya veya yönetmeye gerek kalmadan S3'teki veriler için etkileşimli sorgular (geçici sorgular) çalıştırmanın en kolay yolunu sağlar.
    -AWS Glue, verileri dönüştürür ve çeşitli hedeflere taşır. Analitik için veri hazırlamak ve yüklemek için kullanılır. Veri kaynağı S3, Redshift veya diğer veritabanları olabilir. Glue veri kataloğu(data catalog) Athena, EMR ve RedShift tarafından sorgulanabilir

## AWS IAM
-Identity Access Management (IAM), kullanıcılara, gruplara ve kaynaklara erişim yönetimi için kullanılır
-IAM evrensel bir sistemdir (aynı anda tüm bölgelere uygulanır). IAM ücretsiz bir hizmettir.
-Kök-root hesap, AWS kurulduğunda başlangıçta oluşturulan hesaptır (tam yönetici-full administrator)
-Yeni IAM hesaplarının, verilene kadar varsayılan olarak izni yoktur
-Bir kullanıcının bir AWS hizmetine erişmesine izin vermek için açıkça izin verilmelidir.
-IAM evrenseldir (küresel) ve bölgelere uygulanmaz.
-Kök-root hesabı faturalandırma dışında herhangi bir şey için kullanmamak en iyi uygulamadır.
-Yetkili kullanıcı-Power-user erişimi, IAM'deki grupların ve kullanıcıların yönetimi dışında tüm izinlere izin verir.
-Yeni kullanıcılara, programatik erişim verdiğinizde ilk oluşturulduklarında bir Erişim Anahtarı Kimliği-Access Key Id ve Gizli Erişim Anahtarı-Secret Access Key atanır
-Erişim Anahtarları-Secret Access Key, oluşturulduklarında yalnızca bir kez gösterilir. Kaybolurlarsa silinmeleri/yeniden oluşturulmaları gerekir
-Erişim Anahtarı Kimliği ve Gizli Erişim Anahtarı, parola ile aynı değildir ve AWS konsolunda oturum açmak için kullanılamaz.
-MFA, sürekli olarak rastgele, altı basamaklı, tek kullanımlık kimlik doğrulama kodları üreten bir kimlik doğrulama cihazı kullanır.
-Kök-root Hesaplar için her zaman MFA'yı ayarlayın
-Kullanıcılar MFA'yı kendi başlarına etkinleştirmelidir, Yönetici bunu her kullanıcı için açamaz
-IAM, belirlediğiniz parola ilkelerinizin minimum parola gereksinimleri belirlemesine veya parolaları döndürmesine olanak tanır
-IAM Kimlikleri; Kullanıcılar-users, Gruplar-groups ve Roller-roles  
-IAM Kullanıcıları, konsolda oturum açan veya AWS kaynaklarıyla programlı olarak etkileşim kuran son kullanıcılar
    -Kök-root hesabın tam yönetici izinleri vardır ve bunlar kısıtlanamaz.
    -AWS hesabı başına en fazla 5000 kullanıcınız olabilir.
-IAM Grupları gerekli izinlere sahiptir. Bu izinler, grubun üyesi olan kullanıcılara otomatik olarak eklenebilir.
    -Grup, bir kimlik değildir ve bir IAM politikasında asıl olarak tanımlanamaz.
-Belirli bir kullanıcıya, gruba veya role hizmetlere erişme izni veren IAM politikaları-IAM policies JSON belgeleri.
    -IAM politikaları, IAM'de JSON belgeleri olarak depolanır ve izin verilen veya reddedilen izinleri belirtir.
    -En kısıtlayıcı politika uygulanır.
    -IAM politikaları, kullanıcı (kimlik) tabanlı politikalar veya kaynak tabanlı politikalar olarak ayarlanabilir.
    -Yönetilen ilkeler(Managed policies), AWS tarafından sağlanan ilkelerdir ve düzenlenemez.
    -Müşteri Tarafından Yönetilen İlkeler(Customer Managed Policies), oluşturduğunuz ve AWS hesabınızdaki birden çok kullanıcıya, gruba veya role ekleyebileceğiniz bağımsız, kimlik tabanlı ilkelerdir.
    -Satır İçi İlkeler(Inline Policies), doğrudan bir kullanıcıya bağlı ilkelerdir.
-IAM rolleri, izinleri bir rolle ilişkilendirir ve ardından bunu kullanıcılara veya gruplara atar. Şirket içi ortamda çalışan kişiye bir rol tanımlayabilirsiniz.
    -Harici bir kimlik sağlayıcı kullanarak oturum açan federe bir kullanıcıya bir rol atanabilir.
-AWS Security Token Service (STS), IAM kullanıcıları veya kimliğini doğruladığınız kullanıcılar (federe kullanıcılar) için geçici, sınırlı ayrıcalıklı kimlik bilgileri istemenize olanak tanıyan bir web hizmetidir.
    -Varsayılan olarak, AWS STS küresel bir hizmet olarak sunulur ve tüm AWS STS istekleri https://sts.amazonaws.com adresindeki tek bir uç noktaya gider.
    -AWS STS isteklerinizi isteğe bağlı olarak herhangi bir bölgedeki uç noktalara gönderebilirsiniz (gecikmeyi azaltabilir).
    -Bu hizmetin avantajı, uzun vadeli AWS güvenlik kimlik bilgilerini bir uygulamayla dağıtmak veya yerleştirmek zorunda kalmamanızdır. Geçici güvenlik kimlik bilgilerinin sınırlı bir ömrü vardır, bu nedenle artık gerekmediğinde bunları döndürmeniz veya açıkça iptal etmeniz gerekmez.
-Hesaplar Arası Erişim(Cross-Account Access), bir AWS hesabındaki kullanıcıların diğer bir AWS hesabındaki kaynaklara erişmesine olanak tanır. Farklı bir hesapta istekte bulunmak için, o hesaptaki kaynağın, ihtiyacınız olan izinlere sahip eklenmiş bir kaynak tabanlı politikaya sahip olması veya bu hesapta ihtiyacınız olan izinlere sahip bir rol (kimlik tabanlı politika) üstlenmeniz gerekir.

## AWS Directory Service
-AWS Cloud Directory: Uygulama arasında hiyerarşik verilere erişimi paylaşmak ve kontrol etmek için bulutta yerel dizin
-Kullanım örneği: Karmaşık ilişki ile hiyerarşik verilere ihtiyaç duyan bulut uygulamaları
-AWS Cognito: Milyonlarca kullanıcıya ölçeklenen ve Google, Facebook vb. gibi genel sosyal medya hizmetlerinde birleştirilen kaydolma ve oturum açma işlevi.
-Kullanım örneği: Tüketici uygulamaları veya SaaS geliştirme
-AWS Directory Service for Microsoft Active Directory: Windows Server 2012 R2 üzerinde çalışan AWS tarafından yönetilen Microsoft AD. 5000'den fazla kullanıcınız varsa ve/veya bir güven ilişkisi kurulması gerekiyorsa en iyi seçimdir.
-Bir Windows Sunucusunda çalışır.
-Şirket içi kullanıcılar ve gruplar, SSO(single sign on) kullanarak her iki etki alanındaki kaynaklara erişebilir.
-Kimlik doğrulamasını şirket içi Active Directory'lerden AWS bulutuna genişletmek için güven ilişkileri kurabilirsiniz.
-Kullanım örneği: Hosted Microsoft AD isteyen veya Linux uygulamaları için LDAP'ye ihtiyacınız olan kuruluşlar
-AD Connector: Şirket içi kullanıcıların mevcut AD kimlik bilgileriyle AWS hizmetlerinde oturum açmasına olanak tanır. Ayrıca EC2 instancelarının AD etki alanına katılmasına izin verir
-AD Connectorsı, dizin isteklerini şirket içi Active Directory'nize yeniden yönlendirmek için bir directory gatewaydir.
-Mevcut şirket içi AD'nizi AWS'ye bağlar.
-VPC, VPN veya Direct Connect aracılığıyla şirket içi ağınıza bağlanmalıdır.
-Kullanıcılar AWS uygulamalarında oturum açtığında AD bağlayıcısı, oturum açma isteklerini şirket içi AD DC'lerinize iletir.
-Kullanım örneği: Şirket içi çalışanlar ve etki alanına(domaine) EC2 instanceları eklemek için Single sign-on
-Basit AD(Simple AD): Düşük ölçekli, düşük maliyetli, Samba'ya dayalı AD uygulaması
-Basit AD genellikle en ucuz seçenektir.
-5000'den az kullanıcı için en iyi seçimdir ve gelişmiş AD özelliklerine ihtiyaç duymaz.
-SAMBA 4 Active Directory uyumlu sunucu tarafından desteklenmektedir.
-AWS kaynaklarını yönetmek için Basit AD kullanıcı hesaplarıyla AWS yönetim konsolunda da oturum açabilirsiniz.
-Küçük ve büyük olmak üzere iki seçeneği vardır. Küçük, 500 kullanıcıya kadar destekler, büyük, 5000 kullanıcıya kadar destekler.
-Kullanım örneği: Basit kullanıcı dizini veya LDAP uyumluluğuna ihtiyacınız var.

## AWS KMS
# Encryption
Encryption in flight (SSL)

-Veriler gönderilmeden önce şifrelenir ve alındıktan sonra şifresi çözülür
-SSL sertifikaları şifrelemeye yardımcı olur (HTTPS)
-Encryption in flight, MITM'nin (man in the middle attack) gerçekleşmemesini sağlar

Server-side encryption at rest

-Veriler sunucu tarafından alındıktan sonra şifrelenir
-Veriler gönderilmeden önce şifresi çözülür
-Bir anahtar (genellikle bir veri anahtarı) sayesinde şifreli bir biçimde saklanır.
-Şifreleme/şifre çözme anahtarları bir yerde yönetilmeli ve sunucunun buna erişimi olmalıdır.

Client-side encryption

-Veriler istemci tarafından şifrelenir ve asla sunucu tarafından şifresi çözülmez, bunun yerine verilerin şifresi alıcı bir istemci tarafından çözülür
-Sunucu verilerin şifresini çözememelidir
-Zarf Şifrelemesinden yararlanabilir

# KMS
-Bir AWS hizmeti için "şifreleme" duyduğunuzda, bu büyük olasılıkla KMS'dir
-AWS Key Management Store (KMS), verilerinizi kolayca şifrelemenizi sağlayan yönetilen bir hizmettir.
-AWS KMS, kendi uygulamalarınızdaki verileri şifrelemeniz ve AWS hizmetlerinde depolanan verilerin şifrelenmesini kontrol etmeniz için yüksek düzeyde kullanılabilir bir anahtar depolama, yönetim ve denetleme çözümü sunar.
-Secretlarınızı asla düz metin olarak saklamayın, özellikle kodunuzda!
-Şifrelenmiş Secretlar kod/ortam değişkenlerinde saklanabilir
-KMS, arama başına yalnızca 4 KB'a kadar verinin şifrelenmesine yardımcı olabilir
-AWS KMS, anahtarlarınızı merkezi olarak yönetmenize ve güvenli bir şekilde saklamanıza olanak tanır. Bunlar, müşteri ana anahtarları(customer master keys) (CMK) olarak bilinir.
-Üç tür Müşteri Ana Anahtarı (CMK):
    AWS Managed Service Varsayılan CMK: ücretsiz
    KMS'de oluşturulan Kullanıcı Anahtarları: 1 $ / ay
    İçe aktarılan Kullanıcı Anahtarları (256 bit simetrik anahtar olmalıdır): 1 $ / ay
-CMK'leri KMS'de, bir AWS CloudHSM kümesinde oluşturabilir veya bunları kendi anahtar yönetimi altyapınızdan içe aktarabilirsiniz.
-Bu anahtarlarda, hangi kullanıcıların bunları hangi koşullar altında verileri şifrelemek ve şifresini çözmek için kullanabileceğini belirleyen kullanım ilkeleri belirlersiniz.
-KMS, Lambda, S3, EBS, EFS, DynamoDB, SQS vb. gibi birçok AWS hizmetine sıkı bir şekilde entegre edilmiştir.
-AWS hizmetleri, verilerinizi şifreler ve koruduğu verilerle birlikte veri anahtarının şifrelenmiş bir kopyasını depolar.
-Bir hizmetin verilerinizin şifresini çözmesi gerektiğinde, KMS'den ana anahtarınızı kullanarak veri anahtarının şifresini çözmesini ister.
-AWS hizmetinden veri talep eden kullanıcı, ana anahtar politikanız kapsamında şifre çözme yetkisine sahipse, hizmet, KMS'den şifresi çözülen veri anahtarını alır ve bununla verilerinizin şifresini çözebilir ve düz metin olarak geri gönderebilir.
-Ana anahtarlarınızı kullanmaya yönelik tüm istekler AWS CloudTrail'de günlüğe kaydedilir, böylece kimin hangi anahtarı hangi bağlamda ve ne zaman kullandığını anlayabilirsiniz.
-KMS, şifreleme anahtarı yönetimi için özel olarak oluşturulmuş olması nedeniyle Secrets Manager'dan farklıdır.
-AWS KMS özel anahtar deposu özelliği, AWS CloudHSM tarafından sağlanan kontrolleri, AWS KMS'nin entegrasyonu ve kullanım kolaylığı ile birleştirir.
-Kendi CloudHSM kümenizi yapılandırabilir ve KMS'yi, varsayılan KMS anahtar deposu yerine anahtarlarınız için ayrılmış bir anahtar deposu olarak kullanması için yetkilendirebilirsiniz.

## AWS CloudHSM
-AWS CloudHSM, AWS Cloud üzerinde kendi şifreleme anahtarlarınızı kolayca oluşturmanıza ve kullanmanıza olanak tanıyan bulut tabanlı bir donanım güvenlik modülüdür(hardware security module) (HSM).
-CloudHSM standartlarla uyumludur ve yapılandırmalarınıza bağlı olarak tüm anahtarlarınızı piyasada bulunan diğer HSM'lerin çoğuna aktarmanıza olanak tanır.
-CloudHSM, mevcut veri koruma çözümlerini tamamlar ve güvenli anahtar yönetimi için devlet standartlarına göre tasarlanmış ve doğrulanmış HSM'lerde şifreleme anahtarlarınızı korumanıza olanak tanır.
-CloudHSM, veri şifreleme için kullanılan şifreleme anahtarlarını yalnızca sizin erişebileceğiniz şekilde güvenli bir şekilde oluşturmanıza, saklamanıza ve yönetmenize olanak tanır.
-CloudHSM hizmetini, aşağıdakiler gibi çeşitli kullanım durumlarını ve uygulamaları desteklemek için kullanabilirsiniz;
    Veritabanı şifreleme,(Database encryption,)
    Dijital Hak Yönetimi (DRM),(Digital Rights Management)
    Açık Anahtar Altyapısı (PKI),(Public Key Infrastructure)
    Kimlik doğrulama ve yetkilendirme,(Authentication and Authorization)
    Belge imzalama,(Document signing)
    Hareket işleme.(Transaction processing)
-Bir VPC içinde olmalıdır ve VPC Eşleme yoluyla erişilebilir.
-KMS ----> AWS, yazılımı şifreleme için yönetir
-CloudHSM ---> AWS, şifreleme donanımı sağlar

## Amazon Cognito
-Cognito, merkezi olmayan yönetilen bir kimlik doğrulama sistemidir. Mobil ve masaüstü uygulamanıza kolayca kimlik doğrulama eklemeniz gerektiğinde Cognito'yu düşünün
-Kullanıcılarınız doğrudan bir kullanıcı adı ve şifre ile veya Facebook, Amazon veya Google gibi bir üçüncü taraf aracılığıyla oturum açabilir.
-AWS Cognito'nun iki ana bileşeni, kullanıcı havuzları ve kimlik havuzlarıdır; kullanıcı havuzları, uygulama kullanıcılarınız için kaydolma ve oturum açma seçenekleri sunan kullanıcı dizinleridir; kimlik havuzları, kullanıcılarınıza diğer AWS hizmetlerine erişim izni vermenizi sağlar.
-Kullanıcı Havuzları(User Pools), kullanıcıların web uygulamalarına bağlanmak için Facebook, Google, Amazon gibi IpD'ye OAuth kullanarak kimlik doğrulamasına izin veren kullanıcı dizinleridir. Cognito kullanıcı havuzu kendi içinde bir IpD'dir
-Kullanıcı Havuzları, kimlik doğrulamasını sürdürmek için JSON Web Belirteçlerini(JSON Web Token) (JWT) kullanır
-Kimlik Havuzları(Identity Pools), örneğin hizmete erişmek için geçici AWS kimlik bilgileri sağlar. S3, DynamoDB
-Cognito Sync, kullanıcı verilerini ve tercihini cihaz genelinde çevrimiçi kodla senkronize edebilir (SNS tarafından desteklenir)
-Web Identity Federation, bir kimlik sağlayıcı (IdP) ve bir uygulama arasında kimlik ve güvenlik bilgisi alışverişinde bulunur
-Kimlik Sağlayıcı(Identity Provider) (IdP): Diğer hizmetlere erişmek için kimlik doğrulaması yapmanızı sağlayan, kullanıcı kimliğinizin güvenilir bir sağlayıcısı. örneğin Facebook, Google, Amazon
-OIDC, OAuth kullanan bir Kimlik Sağlayıcı türüdür
-SAML, single sign-on için kullanılan bir kimlik Sağlayıcı türüdür.

## AWS WAF, AWS Shield, and AWS Firewall Manager
-AWS Web Uygulaması Güvenlik Duvarı(AWS Web Application Firewall) (WAF) ve AWS Shield, AWS kaynaklarınızı web açıklarından ve Distributed Denial of Service (DDoS) saldırılarından korumaya yardımcı olur. Soru DDoS saldırılarından bahsediyorsa, WAF ve Shield'ı düşünün.
    -AWS WAF, web uygulamalarınızı, uygulama kullanılabilirliğini etkileyebilecek, güvenliği tehlikeye atabilecek veya aşırı kaynak tüketebilecek yaygın web açıklarından yararlanmaya karşı korumaya yardımcı olan bir web uygulaması güvenlik duvarıdır.
    -DDoS saldırılarına karşı ek koruma için AWS Shield'i kullanın. DDoS yanıt ekibimizden 7/24 destek alın ve DDoS etkinliklerine ilişkin ayrıntılı görünürlük elde edin,
    -AWS WAF, OSI referans modelinin 7. katmanındaki DDoS saldırılarını azaltabilirken, AWS Shield, web hizmetlerini OSI referans modelinin 3. ve 4. katmanındaki DDoS saldırılarından korur.
-AWS Firewall Manager ise AWS WAF kuralları, AWS Shield Advanced koruması ve Amazon VPC güvenlik grupları için birden fazla hesap ve kaynak genelinde yönetim ve bakım görevlerinizi basitleştirir. Firewall Manager hizmeti, yeni hesaplar ve kaynaklar ekleseniz bile, hesaplarınız ve kaynaklarınız genelinde kurallarınızı ve diğer güvenlik korumalarını otomatik olarak uygular.

# AWS WAF
-AWS Web Application Firewall (WAF), tanımladığınız koşullara göre web isteklerine izin veren, bunları engelleyen veya izleyen (sayım) kuralları yapılandırmanıza izin vererek web uygulamalarının saldırılara karşı korunmasına yardımcı olur.
-WAF, özelleştirilebilir web güvenlik kuralları tanımlayarak web uygulamalarınıza hangi trafiğe izin verileceğini veya hangi trafiğin engelleneceğini kontrol etmenizi sağlar.
-AWS hizmetleri web siteleri için istek aldığında, istekler, tanımlanan kurallara göre incelenmek üzere AWS WAF'a iletilir.
-Fiyatlandırma, dağıttığınız kural sayısına ve web uygulamanızın kaç web isteği aldığına bağlıdır.
-Amazon CloudFront ve Application Load Balancer (ALB) hizmetleriyle sıkı bir şekilde entegre edilmiştir.
-Amazon CloudFront'ta AWS WAF'yi kullandığınızda kurallar, dünyanın her yerinde son kullanıcılara yakın olan tüm AWS Edge Locationsda çalışır.
-Web trafiği filtreleme: AWS WAF, IP adresleri, HTTP üstbilgileri ve gövde veya özel URI'leri içeren koşullara göre web trafiğini filtrelemek için kurallar oluşturmanıza olanak tanır.

*** 26-AWS WAF görseli

<img width="912" alt="AWS WAF" src="https://raw.githubusercontent.com/Fatalrhym/yacademy/main/26-AWS%20WAF.JPG">

# AWS Shield
-AWS Shield, AWS üzerinde çalışan uygulamaları koruyan, yönetilen bir DDoS koruma hizmetidir.
-Uygulamanın kapalı kalma süresini ve gecikmesini en aza indiren her zaman açık algılama(always-on detection) ve otomatik satır içi azaltmalar(inline mitigations) sağlar, böylece DDoS korumasından yararlanmak için AWS Support'u kullanmaya gerek kalmaz.
-AWS Shield'in iki katmanı vardır: Standart ve Gelişmiş.
-AWS Shield Standard, web sitenizi veya uygulamalarınızı hedef alan en yaygın ve sıklıkla meydana gelen ağ ve aktarım katmanı DDoS saldırılarına karşı koruma sağlar.
-AWS Shield Standard'ı Amazon CloudFront ve Amazon Route 53 ile kullanırken, bilinen tüm altyapı (Katman 3 ve 4) saldırılarına karşı kapsamlı kullanılabilirlik koruması alırsınız.
-AWS Shield Advanced; EC2, ELB, Amazon CloudFront ve Amazon Route 53 kaynaklarında çalışan uygulamalarınızı hedefleyen saldırılara karşı daha yüksek koruma seviyeleri için kullanılabilir.

## CLI&SDK
-CLI, Komut Satırı Arayüzü(Command Line Interface) anlamına gelir
-SDK, Yazılım Geliştirme Kiti(Software Development Kit) anlamına gelir
-AWS CLI, AWS ile herhangi bir yerden yalnızca bir komut satırı aracılığıyla etkileşim kurmanıza olanak tanır
-AWS SDK, AWS hizmetlerini uygulamalarınıza entegre etmenize olanak tanıyan bir dizi API kitaplığıdır.
-CLI veya SDK kullanmak için IAM konsolu aracılığıyla kullanıcı başına Programlı Erişim(Programmatic Acces) etkinleştirilmelidir
-AWS kimlik bilgilerinizi CLI için ayarlamak için "aws configure" komutu kullanılır
-CLI, bir Python betiği-scripti aracılığıyla yüklenir
-Kimlik bilgileri bir düz metin dosyasında depolanır (mümkün olduğunda AWS kimlik bilgileri yerine rolleri kullanın)
-SDK, aşağıdaki programlama dilleri için mevcuttur;
    C++
    Go
    Java
    Javascript
    .NET
    NodeJs
    PHP
    Python
    Ruby

## AWS SQS
-Simple Queue Service (SQS), kuyruğa sahip mesajları kullanan bir kuyruğa alma hizmetidir.
-SQS, uygulama entegrasyonu için kullanılır, dağıtılmış/ayrışmış(distributed/decoupled) servislerin veya uygulamaların birbirleriyle konuşmasını sağlar.
-SQS kullanımını okumak için AWS SDK'yı kullanarak kuyruğu çekmeniz gerekir.
-SQS, push tabanlı değil, çekme tabanlı (yoklama-polling) kullanır.
-Mesajlar 1 dakikadan 14 güne kadar kuyrukta tutulabilir (varsayılan 4 gündür).
-SQS, hem Standart hem de İlk giren ilk çıkar(First-in-first-out) (FIFO) kuyruklarını destekler
-Standart saniyede neredeyse sınırsız mesaja izin verir, teslimat sırasını garanti etmez, her zaman en az bir kez teslim eder, işlenmekte olan yinelenen mesajları tekrar korumanız gerekir
-FIFO kuyrukları, mesajların gönderildiği ve alındığı kesin sırayı korur.
-FIFO kuyrukları şu anda sınırlı bölgelerde mevcuttur.
-FIFO kuyrukları tam olarak bir kez işleme sağlar; bu, her iletinin bir kez teslim edildiği ve bir tüketici onu işleyip silene kadar kullanılabilir durumda kaldığı anlamına gelir.
-Varsayılan olarak FIFO kuyrukları saniyede 300 iletiye kadar destekler.
-İki tür yoklama-polling vardır Kısa(Varsayılan) ve Uzun Yoklama
-Kısa yoklama, yoklanan ileti kuyruğu boş olsa bile iletileri hemen döndürür. Bu, kısa yoklamanın mesajların kuyrukta görünmesini beklemediği anlamına gelir.
-Uzun yoklama, kuyruğa bir mesaj gelene kadar veya uzun yoklama zaman aşımı süresi dolana kadar bekler. Tüm sunucuları sorgulayarak yanlış boş yanıtları ortadan kaldırır. -SQS, yanıt göndermeden önce kuyrukta bir ileti bulunana kadar bekler.
-Çoğu durumda, kısa yoklama yerine uzun yoklama tercih edilir
-Görünürlük zaman aşımı(visibility timeout), mesajların SQS kuyruğunda görünmez olduğu süredir
-Bir iş işlendikten sonra (görünürlük zaman aşımı sona ermeden önce) mesajlar kuyruktan silinecek
-Görünürlük zaman aşımı sona ererse, bir iş kuyruğa görünür hale gelir
-Varsayılan görünürlük zaman aşımı 30 saniyedir. Zaman aşımı 0 saniyeden maksimum 12 saate kadar olabilir.
-1 bayt ila 256 kb arasındaki ileti boyutu, Java için Genişletilmiş İstemci Kitaplığı(Extended Client Library) 2 GB'a kadar çıkabilir
-Kinesis Data Streams ve SQS arasındaki farklar, Kinesis Data Streams'in ilgili kayıtları aynı kayıt işlemcisine yönlendirmesi, SQS'nin mesaj düzeyinde onay/başarısız görünürlüğü(ack/fail visibility) gibi mesajlaşma semantikleri göndermesidir.

## AWS SWF
-Amazon Simple Workflow (SWF), geliştiricilerin paralel veya sıralı adımlara sahip arka plan işleri oluşturmasına, çalıştırmasına ve ölçeklendirmesine yardımcı olur.
-Amazon SWF, bulutta tam olarak yönetilen bir durum izleyici ve görev koordinatörüdür.
-İş akışları olarak dağıtılmış asenkron sistemler oluşturun.
-Hem sıralı hem de paralel işlemeyi destekler.
-Bir görev başarısız olursa kurtarmanız veya yeniden denemeniz gerekirse Amazon SWF size yardımcı olabilir.
-API aracılığıyla etkileşimde bulunduğunuz ve güncellediğiniz iş akışınızın durumunu izler.
-Sipariş karşılama sistemi gibi insan tarafından etkinleştirilen iş akışları veya prosedürel istekler için en uygunudur.
-AWS, müşterilerin yeni uygulamalar için SWF yerine Step Functions'ı düşünmelerini önerir
-SWF, medya işleme, web uygulaması arka uçları, iş süreci iş akışları ve analitik pipelines dahil olmak üzere bir dizi kullanım senaryosu için uygulamaların görevlerin koordinasyonu olarak tasarlanmasını sağlar.
-SWF'nin iş akışı yürütmeleri için 1 yıla kadar tamamlama süresi vardır.
-SWF, görev odaklı bir API kullanır.
-Çalışanlar-Workers, görevleri almak, alınan görevleri işlemek ve sonuçları döndürmek için Amazon SWF ile etkileşime giren programlardır.
-Karar verici-The decider, uygulama mantığına göre görevlerin koordinasyonunu, yani sıralanmasını, eşzamanlılığını ve zamanlamasını kontrol eden bir programdır.
-Step Functions'ın aşağıdakiler dışında yeni uygulamalar için kullanılması önerilir:
    -Süreçlere müdahale etmek için harici sinyallere ihtiyacınız varsa
    -Değerleri üst süreçlere döndüren alt süreçlere ihtiyacınız varsa

## AWS Step Functions
-AWS Step Functions, uygulamaları hızla oluşturup güncelleyebilmeniz için birden çok AWS hizmetini sunucusuz iş akışlarında koordine etmenize olanak tanır.
-Uygulamanızın adımlarını güvenilir ve ölçeklenebilir bir şekilde yürütmek için durum-state makinelerini hızlı bir şekilde oluşturabilir ve çalıştırabilirsiniz.
-İş akışınızı bir durum-state makinesi diyagramına çevirir
-Görevler, sıralı adımlar, paralel adımlar, dallanma yolları veya zamanlayıcılar oluşturun.
-Amazon State Language bildirimi JSON.
-Uygulamalar, Step Function API aracılığıyla akışla etkileşim kurabilir ve güncelleyebilir.
-Görsel arayüz, akışı ve gerçek zamanlı durumu açıklar.
-Her adımın yürütülmesinin ayrıntılı günlükleri.

## AWS SNS
-Amazon Simple Notification Service (SNS), yüksek oranda erişilebilir, dayanıklı, güvenli, tam olarak yönetilen bir pub/sub mesajlaşma hizmetidir.
-SNS, Uygulama Entegrasyonu(Application Integration) içindir. Ayrılmış hizmetlerin ve uygulamaların birbirleriyle iletişim kurmasını sağlar
-Konu-Topic mantıklı bir nokta ve iletişim kanalıdır
-Basit API'ler ve uygulamalarla kolay entegrasyon kullanır.
-Bir konu-topic birden çok protokole teslim edebilir
-Konuları KMS ile şifreleyebilirsiniz
-Yayıncılar-Publishers, mesajları bir konuya iletmek için AWS CLI veya SDK aracılığıyla AWS API'sini kullanır. Birçok AWS hizmeti, SNS ile entegre olur ve yayıncı olarak hareket eder
-Abonelikler-Subscriptions konulara abone olur. Bir konu bir mesaj aldığında, otomatik olarak ve anında mesajları abonelere iletir.
-SNS'de yayınlanan tüm mesajlar, birden çok AZ'de yedekli olarak depolanır.
-Aşağıdaki protokoller:
    -HTTP ve HTTPS, web uygulamanıza web hook oluşturur
    -E-posta / E-posta-JSON mesajları, kayıtlı adreslere e-posta (metin tabanlı veya JSON nesnesi) olarak gönderilir.
    -Amazon-SQS, SNS mesajını SQS queene yerleştirir
    -AWS Lambda bir lambda işlevini tetikler
    -SMS kısa mesaj gönder
    -Platform uygulaması uç noktaları Mobile Push örn. Apple, Goole, Microsoft Baidu bildirim sistemi

# Comparision of Application Integration Services
-SNS: Buluttan bildirimleri kurun, çalıştırın ve gönderin
-Kullanım örneği: Cloudwatch tetiklendiğinde bir e-posta bildirimi gönderin
-Step Functions: Görsel iş akışıyla AWS hizmet bileşenlerinin kullanıma hazır koordinasyonu
-Kullanım örneği: Sipariş işleme iş akışı
-SWF: Amazon Simple Workflow (Amazon SWF), geliştiricilerin paralel veya sıralı adımlara sahip arka plan işleri oluşturmasına, çalıştırmasına ve ölçeklendirmesine yardımcı olur. Amazon SWF'yi bulutta tam olarak yönetilen bir durum izleyici ve görev koordinatörü olarak düşünebilirsiniz.
-Kullanım senaryosu örneği: Bir sipariş karşılama sistemi veya prosedürel istek için insan tarafından etkinleştirilen iş akışları. AWS, yeni uygulamalar için müşterinin SWF yerine Step Functionsı dikkate almasını önerir
-SQS: Mesajlaşma kuyruğu; patterleri sakla ve ilet
Kullanım örneği: Dağıtılmış/ayrışmış uygulamalar oluşturma
-Amazon MQ: Bulutta mesaj aracılarını kurmayı ve çalıştırmayı kolaylaştıran, Apache ActiveMQ için yönetilen mesaj aracısı hizmeti.
Kullanım örneği: Mevcut ileti aracılarından AWS'ye geçiş için kolay, zahmetsiz yol

# Amazon Workspaces
-Amazon WorkSpaces, tam olarak yönetilen, güvenli bir bulut masaüstü hizmetidir.
-WorkSpaces, müşterilerin son kullanıcıların belgelere ve uygulamalara erişmesine olanak tanıyan bulut tabanlı masaüstlerini kolayca sağlamalarına olanak tanır.
-Desteklenen istemci tarafı cihazlar arasında Windows ve Mac bilgisayarlar, Chromebook'lar, iPad'ler, Fire tabletler, Android tabletler ve Chrome ve Firefox web tarayıcıları bulunur.
-WorkSpaces, sırasıyla Windows Server 2008 R2 ve Windows Server 2016 tarafından desteklenen Windows 7 veya Windows 10 masaüstü deneyimiyle gelen paketler sunar.
-Varsayılan olarak kullanıcılar çalışma alanlarını kişiselleştirebilir ancak bu kilitlenebilir.
-Çalışma alanları kalıcıdır.
-Çalışma alanlarına giriş yapmak için bir AWS hesabına ihtiyacınız yoktur.

## ECR & ECS & EKS
# ECS
-Amazon Elastic Container Service (ECS), Docker containerlarını destekleyen ve yönetilen bir Amazon EC2 bulut sunucusu clustersinde uygulamaları kolayca çalıştırmanıza olanak tanıyan, yüksek düzeyde ölçeklenebilir, yüksek performanslı bir container yönetim hizmetidir.
-Amazon ECS, kendi cluster yönetimi altyapınızı kurmanız, çalıştırmanız ve ölçeklendirmeniz ihtiyacını ortadan kaldırır.
-API çağrılarını kullanarak container özellikli uygulamaları başlatabilir ve durdurabilir, clusterlerin tam durumunu sorgulayabilir ve güvenlik grupları, Elastic Load Balancing, EBS birimleri ve IAM rolleri gibi birçok tanıdık özelliğe erişebilirsiniz.
-Amazon ECS, kaynak gereksinimlerine ve kullanılabilirlik gereksinimlerine göre containerların clusterler arasında yerleşimini planlamak için kullanılabilir.
-Amazon ECS için ek ücret yoktur. Uygulamanızı depolamak ve çalıştırmak için oluşturduğunuz AWS kaynakları (ör. EC2 bulut sunucuları veya EBS birimleri) için ödeme yaparsınız.
-Bir Amazon ECS clusterının sağlanması, yükün dengelenmesi, otomatik ölçeklendirme, izleme ve containerlarınızı clusterınıza yerleştirme işlemlerini yürütmek için Elastic Beanstalk'ı kullanmak mümkündür.
-Alternatif olarak, müşteri uygulama mimarileri için daha ayrıntılı kontrol için doğrudan ECS'yi kullanın.
-Amazon ECS'deki bir hizmeti, Elastic Load Balancing (ELB) hizmeti için bir Application Load Balancer (ALB) ile ilişkilendirmek mümkündür.
-ECS, container yönetimi ve düzenleme için bir açık kaynak proje koleksiyonu olan Blox'u sağlar. Blox, Amazon ECS'den olayları tüketmeyi, cluster durumunu yerel olarak depolamayı ve API'ler aracılığıyla yerel veri deposunu sorgulamayı kolaylaştırır.

AWS Fargate
-Fargate'i ECS ile sunucu veya EC2 bulut sunucusu clusterlerını yönetmek zorunda kalmadan containerları çalıştırmak için kullanabilirsiniz.
-Artık containerları çalıştırmak için bir sanal makine clusterı sağlamanız, yapılandırmanız veya ölçeklendirmeniz gerekmez
-Fargate, yalnızca Elastic Container Registry (ECR) veya Docker Hub'da barındırılan container görüntülerini destekler

# ECR
-Amazon Elastic Container Registry (ECR), yönetilen bir Docker kayıt hizmetidir. 
- ECR, hesap düzeyinde Registry ve bölgesel hizmettir. 
- EC2 Container Instance, ECR'ye erişmek için IAM izinlerine sahip olmalıdır 
- ECR yalnızca özel görüntüleri destekler ve bir AWS hesabından kimlik doğrulaması gerektirir

# EKS
-Amazon ayrıca AWS'de Kubernetes kullanarak containerized uygulamaları dağıtmak, yönetmek ve ölçeklendirmek için kullanılabilen Kubernetes için Elastic Container Service (Amazon EKS) sağlar.
-upstream Kubernetes ile uyumludur, bu nedenle diğer Kubernetes dağıtımlarından kaldırmak ve değiştirmek kolaydır
-"Pods", birbirleriyle yan yana yerleştirilmiş ve birbirlerine ortak erişime sahip olabilen containerlardır.

Fargate Launch Type
-Fargate Launch Type, arka uç altyapısını sağlamaya ve yönetmeye gerek kalmadan containerlı uygulamalarınızı çalıştırmanıza olanak tanır. Sadece görev tanımınızı kaydedin ve Fargate sizin için containerı başlatsın.
-Fargate Launch Type, AWS tarafından yönetilen sunucusuz bir altyapıdır.
-Fargate, yalnızca Elastic Container Registry (ECR) veya Docker Hub'da barındırılan container görüntülerini destekler.

EC2 Launch Type
-EC2 Launch Type, containerized uygulamalarınızı yönettiğiniz bir Amazon EC2 bulut sunucusu kümesinde çalıştırmanıza olanak tanır.
-Özel depolar yalnızca EC2 Launch Type tarafından desteklenir.

## AWS CodeCommit & AWS CodeBuild & AWS CodeDeploy & AWS CodePipeline
AWS CodeCommit – Git tabanlı güvenli depoları barındıran tam olarak yönetilen bir source control hizmeti. CodeCommit, ekiplerin güvenli ve yüksek düzeyde ölçeklenebilir bir ekosistemde kod üzerinde işbirliği yapmasını kolaylaştırır. Bu çözüm, uygulama ve dağıtım kodlarını depolamak üzere bir havuz oluşturmak için CodeCommit'i kullanır.

AWS CodeBuild – Dinamik olarak oluşturulmuş bir yapı sunucusunda kaynak kodu derleyen, testler çalıştıran ve dağıtılmaya hazır yazılım paketleri üreten, tam olarak yönetilen bir sürekli entegrasyon(continuous integration) hizmeti. Bu çözüm, daha sonra dağıtacağımız kodu oluşturmak ve test etmek için CodeBuild'i kullanır.

AWS CodeDeploy – Amazon EC2, AWS Fargate, AWS Lambda ve şirket içi sunucularınız gibi çeşitli compute servislerine yazılım dağıtımlarını otomatikleştiren, tam olarak yönetilen bir dağıtım hizmeti. Bu çözüm, kodu veya uygulamayı CodeDeploy aracılarını çalıştıran bir dizi EC2 bulut sunucusuna dağıtmak için CodeDeploy'u kullanır.

AWS CodePipeline – Hızlı ve güvenilir uygulama ve altyapı güncellemeleri için release pipelineınızı otomatikleştirmenize yardımcı olan, tam olarak yönetilen bir sürekli teslim(continuous delivery) hizmeti. Bu çözüm, CodeCommit'ten uygulama kodunu alan, CodeBuild kullanarak derleyen ve test eden ve son olarak CodeDeploy kullanarak dağıtan uçtan uca bir işlem hattı oluşturmak için CodePipeline'ı kullanır.