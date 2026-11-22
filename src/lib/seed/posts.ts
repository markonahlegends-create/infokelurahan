import type { NewPostInput, Post } from "../types";

const V = "https://berita.cilegon.go.id/assets/img/berita";

/**
 * Data awal: 16 berita Kota Cilegon.
 *
 * 8 berita ditulis ulang dari rilis resmi Diskominfo Kota Cilegon
 * (berita.cilegon.go.id) menggunakan sumber gambar CDN yang sama.
 * 8 berita pendukung adalah editorial contoh bertema kelurahan —
 * ditandai di kolom editor — untuk mengisi ragam kategori dan
 * tampilan rubrik kelurahan sebelum redaksi menambah berita sendiri.
 */

type Seed = Omit<Post, "id">;

const SEEDS: Seed[] = [
  // ── 1. HEADLINE: Pemerintahan ──────────────────────────────────────
  {
    slug: "kecamatan-gerogol-juara-umum-mtq-xxv-kota-cilegon",
    title: "Kecamatan Gerogol Raih Juara Umum MTQ XXV Tingkat Kota Cilegon",
    excerpt:
      "Kecamatan Gerogol memuncaki klasemen MTQ XXV Kota Cilegon 2026 dengan nilai 188. Sekda mengajak seluruh kafilah membumikan nilai Al-Qur'an dalam kehidupan sehari-hari.",
    content: [
      "**Diskominfo, CILEGON** – Kecamatan Gerogol berhasil meraih predikat Juara Umum pada Musabaqah Tilawatil Quran (MTQ) XXV Tingkat Kota Cilegon Tahun 2026 dengan perolehan nilai 188. Pengumuman tersebut disampaikan pada malam penutupan MTQ XXV yang berlangsung di Kecamatan Ciwandan, Senin malam (9/11/2026).",
      "Penutupan MTQ XXV secara resmi dihadiri Sekretaris Daerah Kota Cilegon, Ahmad Aziz Setia Ade Putra, yang dalam sambutannya menyampaikan apresiasi dan terima kasih kepada seluruh pihak yang telah berkontribusi menyukseskan penyelenggaraan MTQ selama empat hari di Kecamatan Ciwandan. \"Alhamdulillah seluruh rangkaian kegiatan telah terlaksana dengan baik, lancar dan penuh semangat kebersamaan. Mulai dari pelaksanaan pawai devile hingga seluruh cabang perlombaan, kita telah menyaksikan antusiasme yang luar biasa dari para peserta dan masyarakat,\" ungkapnya.",
      "Aziz mengatakan, keberhasilan penyelenggaraan MTQ bukan semata-mata keberhasilan panitia, melainkan keberhasilan seluruh masyarakat Kota Cilegon, khususnya masyarakat Kecamatan Ciwandan yang telah menjadi tuan rumah dengan baik. Ia juga menyampaikan apresiasi kepada LPTQ Kota Cilegon, jajaran Kecamatan Ciwandan, dewan hakim, dewan pengawas, para kafilah, pengurus DKM, lembaga pendidikan, BUMN, BUMD, perbankan, jajaran PKK, majelis taklim serta seluruh stakeholder yang telah memberikan dukungan.",
      "Secara khusus, Aziz mengapresiasi partisipasi masyarakat yang turut menghadirkan warung amal dengan menyediakan makanan dan minuman khas Kota Cilegon secara gratis bagi masyarakat dan para peserta MTQ. \"Inilah semangat kebersamaan dan gotong royong yang harus kita jaga. MTQ tidak hanya menghadirkan perlombaan, tetapi juga mempererat persaudaraan dan kepedulian sosial di tengah masyarakat,\" ujarnya.",
      "Lebih lanjut, Aziz menegaskan bahwa MTQ bukan sekadar ajang perlombaan untuk mencari peserta dengan kemampuan membaca Al-Qur'an terbaik maupun hafalan terbanyak. Lebih dari itu, MTQ harus menjadi sarana untuk membumikan nilai-nilai Al-Qur'an dalam kehidupan sehari-hari. \"Kita ingin semangat membaca, memahami dan mengamalkan Al-Qur'an terus tumbuh di tengah masyarakat, tidak hanya selama perlombaan berlangsung,\" tuturnya.",
      "Pada kesempatan tersebut, Aziz juga menyampaikan selamat kepada Kecamatan Gerogol yang berhasil meraih Juara Umum MTQ XXV Tahun 2026. Ia berharap prestasi tersebut dapat menjadi motivasi untuk terus meningkatkan kemampuan dan kualitas pembinaan para peserta.",
      "Sebelumnya, Kepala Bagian Kesejahteraan Rakyat (Kabag Kesra) Setda Kota Cilegon, Rahmatullah, yang membacakan laporan panitia menyampaikan bahwa pelaksanaan MTQ XXV selama empat hari di Kecamatan Ciwandan berlangsung dengan lancar, tertib dan kondusif. Ia juga mengapresiasi antusiasme masyarakat Kecamatan Ciwandan yang turut menyukseskan kegiatan tersebut.",
      "Adapun hasil akhir MTQ XXV Tingkat Kota Cilegon Tahun 2026 menempatkan Kecamatan Gerogol sebagai Juara Umum dengan nilai 188. Posisi kedua diraih Kecamatan Ciwandan dengan nilai 164, disusul Kecamatan Jombang di posisi ketiga dengan nilai 162. Selanjutnya, Kecamatan Purwakarta menempati posisi keempat dengan nilai 154, Kecamatan Cibeber posisi kelima dengan nilai 143, Kecamatan Pulomerak posisi keenam dengan nilai 93, Kecamatan Citangkil posisi ketujuh dengan nilai 85, dan Kecamatan Cilegon berada di posisi kedelapan dengan nilai 27.",
    ],
    cover_image: `${V}/189870_0.jpg`,
    category_slug: "pemerintahan",
    district_slug: "gerogol",
    village_slug: "gerogol",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Kecamatan-Gerogol-Raih-Juara-Umum-MTQ-XXV-Tingkat-Kota-Cilegon/20261123/MTg5ODcw",
    published_at: "2026-11-09T14:11:54+07:00",
    views: 4821,
    is_headline: true,
    status: "published",
  },

  // ── 2. HEADLINE: Pemerintahan / keamanan ──────────────────────────
  {
    slug: "pemkot-polres-cilegon-integrasikan-cctv-semua-titik",
    title: "Awasi Pergerakan Kriminal, Pemkot dan Polres Cilegon Integrasikan CCTV di Semua Titik",
    excerpt:
      "Melalui MoU, CCTV milik Pemkot Cilegon akan terhubung ke Command Center Polres Cilegon. Penambahan titik difokuskan di Jalan Lingkar Selatan.",
    content: [
      "**Diskominfo, CILEGON** – Pemerintah Kota (Pemkot) Cilegon bersama Polres Cilegon memperkuat pengawasan keamanan wilayah melalui integrasi kamera pengawas atau Closed Circuit Television (CCTV). Hal ini tertuang melalui penandatanganan nota kesepahaman (MoU) tentang integrasi CCTV serta sinergi pelaksanaan Program Polisi Peduli Pengangguran (Poliran) di Rumah Dinas Wali Kota Cilegon, Kamis 19 November 2026.",
      "Langkah ini dilakukan untuk memantau aktivitas masyarakat sekaligus mengantisipasi berbagai tindak kriminalitas yang berpotensi terjadi di sejumlah kawasan.",
      "Dalam sambutannya, Wali Kota Cilegon Robinsar mengatakan jika kerjasama integrasi CCTV merupakan salah satu upaya untuk memperkuat pengawasan dan meningkatkan keamanan di wilayah Kota Cilegon. Melalui kerja sama tersebut, CCTV yang dikelola Pemkot nantinya dapat terhubung dengan sistem pemantauan di Command Center Polres Cilegon.",
      "\"Jadi, CCTV yang hari ini Pemkot kelola nanti akan terintegrasi dengan sistem yang ada di Polres. Tujuannya satu yaitu untuk mendukung keamanan dan memberikan rasa aman kepada masyarakat,\" ujarnya.",
      "Terkait penguatan sistem keamanan, Robinsar menyampaikan bahwa pihaknya berencana melakukan penambahan titik CCTV, terutama di wilayah yang dinilai rawan tindak kriminalitas. Salah satu lokasi yang menjadi perhatian yaitu Jalan Lingkar Selatan (JLS), mengingat kawasan tersebut kerap mengalami pencurian kabel dan memiliki sejumlah titik yang minim penerangan.",
      "Selain mengandalkan teknologi pengawasan, Robinsar juga menyampaikan bahwa Pemkot Cilegon akan memperkuat upaya pencegahan melalui patroli bersama antara kepolisian dan Satpol PP. \"Kami sudah berkoordinasi dengan Pak Kapolres, beliau juga akan menurunkan tim untuk patroli, sementara dari kami (Satpol PP) sudah membentuk tim agar bisa bersama-sama melakukan pengawasan,\" jelasnya.",
      "Selain integrasi CCTV, kerja sama tersebut juga mencakup program Polisi Peduli Pengangguran atau Poliran yang bertujuan membantu mengatasi persoalan pengangguran di Kota Cilegon. Robinsar menilai program tersebut menjadi salah satu solusi untuk memperluas kesempatan kerja bagi masyarakat.",
      "Sementara itu, Kapolres Cilegon AKBP Andika Adi Pradana mengatakan, integrasi CCTV merupakan salah satu langkah untuk mendukung tugas kepolisian dalam menekan angka kejahatan, khususnya pencurian kabel dan tindak pidana 3C, yakni pencurian dengan pemberatan (curat), pencurian dengan kekerasan (curas) serta pencurian kendaraan bermotor (curanmor).",
      "Lebih lanjut, Andika menjelaskan jika integrasi CCTV akan menghubungkan sistem milik Diskominfo dengan sistem kepolisian tanpa mengalihkan kepemilikan maupun pengelolaan perangkat. \"Jadi bukan dialihkan, tetapi diintegrasikan. Sistem yang dimiliki Diskominfo akan disambungkan dengan sistem yang kami miliki sehingga kepolisian bisa mengakses CCTV tersebut,\" terangnya.",
      "Terkait program Poliran, Andika menjelaskan bahwa dalam pelaksanaannya akan melibatkan perusahaan-perusahaan di Kota Cilegon agar dapat membuka kesempatan kerja bagi masyarakat setempat. Program tersebut akan dilakukan melalui pelatihan, penyaluran tenaga kerja, hingga proses perekrutan dengan sasaran utama warga Kota Cilegon.",
    ],
    cover_image: `${V}/119138_0.jpg`,
    category_slug: "pemerintahan",
    district_slug: "cilegon",
    village_slug: "ciwaduk",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Awasi-Pergerakan-Kriminal,-Pemkot-dan-Polres-Cilegon-Integrasikan-CCTV-di-Semua-Titik/20261123/MTE5MTM4",
    published_at: "2026-11-19T08:27:03+07:00",
    views: 6213,
    is_headline: true,
    status: "published",
  },

  // ── 3. Pendidikan ──────────────────────────────────────────────────
  {
    slug: "robinsar-beasiswa-cilegon-juare-sdm-unggul",
    title: "Robinsar Dorong Penerima Beasiswa Cilegon Juare Jadi SDM Unggul dan Siap Bersaing di Dunia Industri",
    excerpt:
      "763 mahasiswa menerima Beasiswa Cilegon Juare 2026 dengan anggaran Rp27 miliar. Wali Kota menekankan pentingnya kompetensi untuk industri padat modal.",
    content: [
      "**Diskominfo, CILEGON** – Wali Kota Cilegon Robinsar mendorong para penerima Beasiswa Cilegon Juare untuk memanfaatkan kesempatan pendidikan tinggi sebagai bekal meningkatkan kompetensi dan daya saing, khususnya dalam menghadapi kebutuhan tenaga kerja di sektor industri Kota Cilegon.",
      "Hal tersebut disampaikan Robinsar saat menghadiri kegiatan penyerahan Beasiswa Cilegon Juare Tahun 2026 yang dirangkaikan dengan bimbingan teknis bagi para penerima beasiswa di Aula Dinas Komunikasi dan Informatika (Diskominfo) Kota Cilegon, Kamis (19/11/2026).",
      "Robinsar mengatakan, peningkatan kualitas sumber daya manusia (SDM) masyarakat lokal menjadi salah satu prioritas Pemerintah Kota Cilegon. Terlebih, sebagai kota industri, Cilegon memiliki karakteristik industri padat modal yang membutuhkan tenaga kerja dengan keterampilan dan kualifikasi tertentu.",
      "\"Kota Cilegon merupakan kota industri yang sebagian besar industrinya padat modal, bukan padat karya. Industri di Cilegon bukan pabrik sepatu atau garmen, melainkan industri kimia, baja, plastik, dan kepelabuhanan yang membutuhkan tenaga kerja dengan klasifikasi keterampilan sesuai kebutuhan industri,\" ungkap Robinsar.",
      "Menurutnya, kondisi tersebut menjadi tantangan sekaligus peluang bagi generasi muda Cilegon untuk mempersiapkan diri melalui pendidikan dan peningkatan kompetensi. \"Kita bukan anti terhadap pendatang. Namun, kita ingin menciptakan dan menguatkan SDM masyarakat Cilegon agar mampu bersaing. Jangan sampai 10 atau 20 tahun ke depan masyarakat lokal justru terpinggirkan karena tidak mampu bersaing. Karena itu, peningkatan SDM harus kita mulai dari sekarang,\" tegasnya.",
      "Pada tahun 2026, jumlah penerima Beasiswa Cilegon Juare mencapai 763 mahasiswa, meningkat dibandingkan tahun sebelumnya sebanyak 511 penerima. Sementara itu, anggaran yang dialokasikan juga mengalami peningkatan dari Rp25 miliar pada tahun sebelumnya menjadi Rp27 miliar pada tahun ini.",
      "Program tersebut telah membuka kesempatan bagi mahasiswa untuk menempuh pendidikan di berbagai perguruan tinggi ternama, seperti Universitas Indonesia, Universitas Gadjah Mada, Universitas Brawijaya, Universitas Airlangga, Universitas Diponegoro, Universitas Padjadjaran, Institut Teknologi Bandung, IPB University, Institut Teknologi Sepuluh Nopember, dan Universitas Pendidikan Indonesia.",
      "Robinsar turut mengapresiasi kontribusi perguruan tinggi mitra yang dinilai mulai menunjukkan hasil. Salah satunya Universitas Al-Khairiyah yang telah melaporkan sekitar 600 alumninya berhasil bekerja, baik di industri Kota Cilegon maupun di tempat lainnya.",
      "Selain mendorong peningkatan kompetensi, Robinsar mengingatkan para mahasiswa bahwa beasiswa yang diterima merupakan amanah yang bersumber dari uang rakyat sehingga harus dipergunakan secara bertanggung jawab. \"Ingat, beasiswa ini menggunakan uang rakyat, uang dari pajak masyarakat. Jadi, jangan digunakan seenaknya. Belajarlah dengan rajin dan sungguh-sungguh agar ilmu yang diperoleh bermanfaat bagi keluarga dan kembali memberikan manfaat untuk Kota Cilegon,\" pesannya.",
    ],
    cover_image: `${V}/172826_0.jpg`,
    category_slug: "pendidikan",
    district_slug: "jombang",
    village_slug: "sukmajaya",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Robinsar-Dorong-Penerima-Beasiswa-Cilegon-Juare-Jadi-SDM-Unggul-dan-Siap-Bersaing-di-Dunia-Industri/20261123/MTcyODI2",
    published_at: "2026-11-19T08:43:00+07:00",
    views: 5340,
    is_headline: true,
    status: "published",
  },

  // ── 4. Pemerintahan / Linmas ───────────────────────────────────────
  {
    slug: "apel-akbar-satlinmas-banten-robinsar-linmas-aktif",
    title: "Hadiri Apel Akbar Satlinmas di Provinsi Banten, Wali Kota Cilegon Robinsar Berpesan Linmas Aktif Lindungi Masyarakat",
    excerpt:
      "Sekitar seribu anggota Linmas Kota Cilegon menerima honorarium bulanan dan perlindungan BPJS Ketenagakerjaan. Robinsar berharap peran Linmas semakin terasa di tengah warga.",
    content: [
      "**Diskominfo, SERANG** – Wali Kota Cilegon Robinsar menghadiri Apel Akbar Satuan Perlindungan Masyarakat (Satlinmas) di Masjid Al Bantani, Kawasan Pusat Pemerintahan Provinsi (KP3) Banten, Kota Serang, Rabu (18/11/2026).",
      "Apel akbar tersebut dipimpin langsung oleh Ketua Dewan Pembina Aslinmas, Jaksa Agung ST Burhanudin. Turut hadir Dewan Pengawas Aslinmas, Jaksa Agung Muda Intelejen (Jamintel) Kejagung Reda Mantowani, Gubernur Banten Andra Soni, dan Gubernur Jawa Barat Dedi Mulyadi. Rombongan pejabat Kota Cilegon yang hadir antara lain Sekda Cilegon Aziz Setia Ade, sejumlah kepala dinas, camat, dan lurah.",
      "Wali Kota Robinsar mengapresiasi pelaksanaan Apel Akbar Satlinmas di Provinsi Banten. Ia mengharapkan kegiatan itu dapat menjadi penyemangat dan ruang koordinasi Linmas di seluruh Indonesia, serta berpesan agar Satlinmas Cilegon terus berperan aktif melindungi masyarakat.",
      "\"Tentu kami mengapresiasi apel akbar ini, dalam rangka penyemangat dan juga koordinasi agar Linmas di seluruh Indonesia, khususnya di Cilegon bisa berperan aktif turun ke masyarakat dalam rangka menjaga ketertiban,\" ujar Robinsar usai apel.",
      "Robinsar mengharapkan, ke depan dengan adanya wadah asosiasi satuan perlindungan masyarakat (Aslinmas), anggota linmas dapat diperhatikan. \"Harapannya dengan apel ini secara fungsi ke depan Linmas bisa diperhatikan baik tingkat kota, provinsi dan pusat. Agar terasa hadirnya linmas dan manfaatnya juga ada untuk anggota Linmas,\" ucapnya.",
      "Saat ini, kata Robinsar, jumlah anggota linmas di Kota Cilegon kurang lebih seribu orang. Pemkot telah memberikan honorarium per bulan, dan Linmas juga menerima perlindungan BPJS Ketenagakerjaan. \"Ada bentuk honor kepada rekan-rekan Linmas, kurang lebih Rp200 ribu per bulan dan juga BPJS ketenagakerjaan dan juga ada santunan kecelakaan dan kematian,\" ucapnya.",
      "\"Seperti tadi Rp40 juta, itu yang sudah terdaftar anggota BPJS dan juga anggota linmas. Tadi Pak Gubernur (Andra Soni) menyampaikan, akan ada peningkatan baik BPJS, honorarium dan sebagainya,\" sambungnya.",
      "Robinsar juga mengapresiasi kepada Kejagung, Jamintel, dan Gubernur yang telah menjadi inisiator pembentukan Aslinmas. Ia berharap komunikasi dapat terus dijalin lebih baik lagi agar keberadaan Linmas semakin terasa di tengah masyarakat.",
    ],
    cover_image: `${V}/117886_0.jpg`,
    category_slug: "pemerintahan",
    district_slug: "citangkil",
    village_slug: "kebonsari",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Hadiri-Apel-Akbar-Satlinmas-di-Provinsi-Banten,-Wali-Kota-Cilegon-Robinsar-Berpesan-Linmas-Aktif-Lindungi-Masyarakat/20261123/MTE3ODg2",
    published_at: "2026-11-18T14:12:27+07:00",
    views: 2870,
    is_headline: false,
    status: "published",
  },

  // ── 5. Olahraga / Porprov ──────────────────────────────────────────
  {
    slug: "kirab-api-obor-porprov-vii-banten-kontingen-cilegon",
    title: "Kirab Api Obor Porprov VII Banten 2026, Robinsar Lepas 750 Anggota Kontingen Kota Cilegon",
    excerpt:
      "750 atlet dan unsur pendukung diberangkatkan ke Porprov VII Banten di Tangerang Selatan. Bonus medali emas dijadwalkan cair Februari 2027.",
    content: [
      "**CILEGON, DISKOMINFO** – Pemerintah Kota Cilegon melepas atlet Kontingen Kota Cilegon di Alun-Alun Kota Cilegon, Jumat (13/11/2026). Kegiatan tersebut menjadi momentum untuk membangkitkan semangat dan memberikan dukungan kepada seluruh atlet yang akan berlaga membawa nama baik Kota Cilegon di ajang olahraga tingkat Provinsi Banten.",
      "Wali Kota Cilegon Robinsar secara langsung melepas keberangkatan kontingen yang berjumlah 750 orang, terdiri dari atlet dan unsur pendukung. Dalam sambutannya, Robinsar menyampaikan bahwa seluruh atlet yang terpilih merupakan putra-putri terbaik Kota Cilegon yang telah melalui proses seleksi serta persiapan dan latihan bersama para pelatih.",
      "\"Atas nama Pemerintah Kota Cilegon, kami mengucapkan selamat bertanding. Adik-adik yang berdiri di sini adalah orang-orang pilihan yang sudah ditempa dan diseleksi. Kami yakin dengan latihan dan gemblengan para pelatih, kontingen Kota Cilegon mampu mencapai target dan membawa medali emas sebanyak-banyaknya untuk Kota Cilegon,\" ujar Robinsar.",
      "Robinsar juga berpesan agar seluruh atlet menjaga kesehatan, mempersiapkan diri dengan baik, menjaga konsentrasi, serta mengikuti arahan pelatih selama mengikuti pertandingan. Ia mengingatkan pentingnya menjaga kekompakan dan kepercayaan terhadap rekan satu tim, serta memohon doa dan restu orang tua sebelum bertanding.",
      "Lebih lanjut, Robinsar menegaskan komitmen Pemerintah Kota Cilegon untuk terus memberikan perhatian terhadap kemajuan dunia olahraga. Ia menyampaikan bahwa bonus bagi atlet peraih medali pada Porprov VII Banten 2026 telah dianggarkan dan direncanakan dapat disalurkan pada Februari 2027.",
      "Selain itu, Robinsar juga menyampaikan apresiasi kepada lima atlet Kota Cilegon yang telah mengharumkan nama daerah di tingkat nasional maupun internasional. Sebagai bentuk penghargaan, Pemkot merencanakan pemberian hadiah umrah gratis bagi lima atlet tersebut pada tahun 2027.",
      "Sementara itu, Ketua Umum KONI Kota Cilegon, Irfan Ali Hakim, menyampaikan bahwa Kirab Api Obor sekaligus pelepasan kontingen merupakan momentum penting dalam mengantarkan para atlet untuk berjuang pada Porprov VII Banten yang diselenggarakan di Kota Tangerang Selatan.",
      "Irfan menjelaskan, total kontingen Kota Cilegon berjumlah 750 orang. Sebagian atlet bahkan telah lebih dahulu bertanding sejak 9 November 2026. Ia juga menyampaikan kabar menggembirakan bahwa Kota Cilegon telah berhasil memperoleh medali emas pertama melalui cabang olahraga sepak takraw.",
      "\"Adik-adik yang berangkat merupakan delegasi Kota Cilegon. Saya berpesan agar menjaga kesehatan, maksimalkan seluruh kemampuan, dan ingat bahwa kehadiran kita di Kota Tangerang Selatan adalah untuk membawa nama baik daerah. Tunjukkan sportivitas dengan semangat Cilegon Juara,\" tuturnya.",
    ],
    cover_image: `${V}/198496_0.jpg`,
    category_slug: "olahraga",
    district_slug: "cilegon",
    village_slug: "ketileng",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Kirab-Api-Obor-Porprov-VII-Banten-2026,-Robinsar-Lepas-750-Anggota-Kontingen-Kota-Cilegon/20261123/MTk4NDk2",
    published_at: "2026-11-13T08:13:12+07:00",
    views: 3910,
    is_headline: false,
    status: "published",
  },

  // ── 6. Olahraga / prestasi atlet ──────────────────────────────────
  {
    slug: "iqbal-sabana-tiga-emas-angkat-besi-porprov-banten",
    title: "Iqbal Sabana, Atlet Angkat Besi Cilegon Sapu Bersih 3 Emas di PORPROV Banten 2026",
    excerpt:
      "Atlet angkat besi Kota Cilegon Iqbal Sabana memborong tiga emas dari kelas 75 kilogram putra pada hari pertama Porprov VII Banten 2026.",
    content: [
      "**Diskominfo, CILEGON** – Cabang olahraga (cabor) angkat besi Kota Cilegon unjuk gigi pada hari pertama Pekan Olahraga Provinsi (PORPROV) VII Banten 2026 dengan menyabet tiga medali emas.",
      "Atlet angkat besi Cilegon, Iqbal Sabana, sukses memborong tiga medali emas sekaligus dari kelas 75 kilogram putra pada pertandingan yang berlangsung di Aula Kecamatan Pondok Aren, Kota Tangerang Selatan, Rabu (18/11/2026).",
      "Tiga medali emas tersebut diraih Iqbal dari nomor angkatan snatch, clean and jerk, serta total angkatan. Hasil ini sekaligus menjadi kontribusi awal bagi kontingen Kota Cilegon dalam perburuan medali di ajang olahraga terbesar tingkat Provinsi Banten tersebut.",
      "Ketua PABSI Kota Cilegon, Ubud Syahbudin Ramdani mengatakan, Iqbal berhasil mengungguli atlet dari empat kota kabupaten lainnya yang turun di kelas 75 kilogram putra. \"Alhamdulillah, atlet kita berhasil menyapu bersih dan mendapatkan 3 medali emas di kelas 75 kg,\" katanya.",
      "Ubud menjelaskan, PABSI Kota Cilegon mengirimkan enam atlet untuk berlaga pada PORPROV VII Banten 2026. Raihan tiga emas pada hari pertama menjadi modal positif bagi cabang olahraga angkat besi untuk kembali menambah pundi-pundi medali.",
      "Selain keberhasilan Iqbal, PABSI Cilegon masih memiliki atlet unggulan yang diproyeksikan mampu meraih medali emas, termasuk dari kategori putri kelas 77 kilogram plus. \"Insya Allah besok kita akan bermain kembali, kita masih memiliki unggulan atlet putri di kelas 77 kg plus. Minta doanya mudah-mudahan bisa kembali menyumbang medali emas untuk Cilegon,\" ujarnya.",
      "Dengan hasil tersebut, PABSI Cilegon membuka peluang untuk terus menyumbangkan medali bagi kontingen Kota Cilegon dalam persaingan PORPROV VII Banten 2026.",
    ],
    cover_image: `${V}/296889_0.jpg`,
    category_slug: "olahraga",
    district_slug: "purwakarta",
    village_slug: "kebondalem",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Iqbal-Sabana,-Atlet-Angkat-Besi-Cilegon-Sapu-Bersih-3-Emas-di-PORPROV-Banten-2026/20261123/Mjk2ODg5",
    published_at: "2026-11-18T16:05:00+07:00",
    views: 4180,
    is_headline: false,
    status: "published",
  },

  // ── 7. Pemerintahan / Hari Pahlawan ───────────────────────────────
  {
    slug: "peringati-hari-pahlawan-2026-fajar-ajak-asn-teladani-pahlawan",
    title: "Peringati Hari Pahlawan 2026, Wakil Wali Kota Cilegon Fajar Ajak ASN Teladani Semangat Perjuangan Para Pahlawan",
    excerpt:
      "Upacara Hari Pahlawan di halaman Kantor Wali Kota Cilegon menjadi momentum refleksi pengabdian. Fajar menegaskan jabatan adalah amanah.",
    content: [
      "**Cilegon, Diskominfo** – Wakil Wali Kota Cilegon Fajar Hadi Prabowo mengajak seluruh Aparatur Sipil Negara (ASN) di lingkungan Pemerintah Kota Cilegon untuk meneladani semangat perjuangan para pahlawan melalui pengabdian yang tulus dan pelayanan terbaik kepada masyarakat.",
      "Ajakan tersebut disampaikan Fajar saat memimpin Upacara Peringatan Hari Pahlawan Nasional Tahun 2026 yang berlangsung di Halaman Kantor Wali Kota Cilegon, Selasa 10 November 2026. Dalam kegiatan tersebut turut hadir jajaran Forum Koordinasi Pimpinan Daerah (Forkopimda) Kota Cilegon, pejabat eselon II dan III di lingkungan Pemkot Cilegon, para veteran serta pelajar.",
      "Di kesempatan itu, Fajar juga menyampaikan bahwa peringatan Hari Pahlawan bukan hanya mengenang peristiwa sejarah, melainkan sebagai momentum untuk mengingat kembali besarnya pengorbanan para pejuang dalam merebut kemerdekaan Indonesia.",
      "\"Hari ini kita tidak hanya merayakan sebuah sejarah, tetapi juga mengenang pengorbanan. Para pahlawan berjuang dengan berbagai cara, ada yang menggunakan senjata, ada pula yang berjuang melalui pemikiran. Namun, semuanya dilakukan dengan pengorbanan, bahkan hingga mempertaruhkan nyawa demi kemerdekaan dan kesejahteraan bangsa,\" ujarnya.",
      "Lebih lanjut, Fajar menjelaskan jika semangat perjuangan para pahlawan patut menjadi teladan bagi generasi saat ini, khususnya bagi para ASN yang memiliki tanggung jawab sebagai abdi masyarakat.",
      "\"Para pahlawan kita dahulu tidak pernah bertanya apa yang akan didapatkan dari negara ini, melainkan sebaliknya yang mereka pikirkan adalah apa yang bisa dilakukan untuk bangsa dan negara. Kemerdekaan yang kita nikmati hari ini hadir karena perjuangan dan pengorbanan mereka semua,\" ungkapnya.",
      "Fajar juga mengingatkan bahwa seluruh tugas dan arahan dalam lingkungan pemerintahan pada dasarnya harus berorientasi pada kepentingan masyarakat. \"Jangan pernah lupa makna pengabdian yang sesungguhnya. Ketika kita menjalankan tugas, landasan utamanya tentu untuk masyarakat. Itulah yang harus selalu menjadi pegangan kita sebagai abdi masyarakat,\" tegasnya.",
      "\"Jangan pernah merasa bahwa pekerjaan Bapak dan Ibu terlalu kecil untuk melakukan perubahan. Apa pun peran yang dijalankan, semuanya berarti dan memiliki kontribusi. Jabatan adalah amanah, kewenangan adalah tanggung jawab, dan pelayanan serta pengabdian merupakan sebuah kehormatan,\" pungkasnya.",
    ],
    cover_image: `${V}/196070_0.jpg`,
    category_slug: "pemerintahan",
    district_slug: "purwakarta",
    village_slug: "purwakarta",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Peringati-Hari-Pahlawan-2026,-Wakil-Wali-Kota-Cilegon-Fajar-Ajak-ASN-Teladani-Semangat-Perjuangan-Para-Pahlawan/20261123/MTk2MDcw",
    published_at: "2026-11-10T14:14:57+07:00",
    views: 3140,
    is_headline: false,
    status: "published",
  },

  // ── 8. Pembangunan / kebencanaan ──────────────────────────────────
  {
    slug: "bpbd-cilegon-usulkan-titik-evakuasi-bencana-43-kelurahan",
    title: "BPBD Cilegon Usulkan Titik Evakuasi Bencana di 43 Kelurahan",
    excerpt:
      "Saat ini baru ada empat titik evakuasi di Ciwandan, Citangkil, Pulomerak, dan Gerogol. BPBD meminta setiap lurah menunjuk lokasi aman di wilayahnya.",
    content: [
      "**Diskominfo, CILEGON** – Badan Penanggulangan Bencana Daerah (BPBD) Kota Cilegon mendorong setiap kelurahan memiliki titik evakuasi bencana sebagai upaya memperkuat kesiapsiagaan masyarakat dalam menghadapi potensi bencana.",
      "Usulan tersebut disampaikan BPBD kepada Dinas Pekerjaan Umum dan Penataan Ruang (DPUPR) Kota Cilegon yang saat ini tengah melakukan review Rencana Tata Ruang Wilayah (RTRW). Melalui usulan tersebut, BPBD berharap keberadaan lokasi evakuasi tidak hanya terpusat di beberapa wilayah, tetapi dapat menjangkau seluruh 43 kelurahan di Kota Cilegon.",
      "Kepala BPBD Kota Cilegon, Damanhuri mengatakan, berdasarkan Kajian Risiko Bencana (KRB), saat ini terdapat empat titik evakuasi yang tersebar di Kecamatan Ciwandan, Citangkil, Pulomerak, dan Gerogol. \"Ada empat titik yaitu Kecamatan Ciwandan, Citangkil, Pulomerak, dan Gerogol,\" ujar Damanhuri.",
      "Namun, seiring dengan proses review RTRW, BPBD mengusulkan agar penentuan lokasi evakuasi diperluas hingga ke tingkat kelurahan. \"Nah karena sekarang ada perubahan RTRW, kita masukan kemarin sudah rapat yang pertama disampaikan bahwa nanti kedepan titik-titik evakuasi itu di 43 kelurahan terutama di kelurahan itu sendiri,\" ungkapnya.",
      "Menurutnya, keberadaan titik evakuasi di setiap kelurahan penting untuk memudahkan masyarakat menemukan lokasi aman ketika terjadi bencana. Dengan demikian, proses penyelamatan dan mobilisasi warga diharapkan dapat dilakukan lebih terarah.",
      "Untuk merealisasikan usulan tersebut, BPBD juga telah mengirimkan surat kepada seluruh kelurahan agar masing-masing lurah mengidentifikasi dan mengusulkan lokasi yang dinilai layak dijadikan tempat evakuasi. \"Dan kami sudah membuatkan surat supaya pak lurah nanti menunjuk kira-kira titik mana di setiap kelurahannya,\" ujarnya.",
      "Damanhuri menjelaskan, lokasi yang diusulkan tidak harus berupa bangunan khusus. Sejumlah fasilitas yang dinilai aman, seperti sekolah maupun tempat lainnya, dapat dipertimbangkan menjadi lokasi evakuasi.",
      "Hasil identifikasi dari masing-masing kelurahan nantinya akan menjadi bahan masukan dalam proses peninjauan tata ruang yang sedang dilakukan DPUPR Kota Cilegon. Melalui langkah tersebut, BPBD berharap perencanaan tata ruang Kota Cilegon turut memperhatikan kebutuhan lokasi evakuasi bencana hingga tingkat kelurahan.",
    ],
    cover_image: `${V}/226972_0.jpg`,
    category_slug: "pembangunan",
    district_slug: "ciwandan",
    village_slug: "tegalratu",
    author: "Admin Diskominfo",
    editor: null,
    source: "Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/BPBD-Cilegon-Usulkan-Titik-Evakuasi-Bencana-di-43-Kelurahan/20261123/MjI2OTcy",
    published_at: "2026-11-16T09:15:00+07:00",
    views: 3560,
    is_headline: false,
    status: "published",
  },

  // ══ Editorial contoh (bukan rilis resmi) ═══════════════════════════
  {
    slug: "jelang-musim-hujan-gotong-royong-drainase-kelurahan",
    title: "Jelang Musim Hujan, Warga Kelurahan di Cilegon Gotong Royong Bersihkan Drainase",
    excerpt:
      "Aksi bersih-bersih saluran air serentak digelar di tingkat RT/RW. Wali Kota meminta lurah dan camat turun langsung memetakan titik rawan genangan.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Memasuki musim penghujan, Pemerintah Kota (Pemkot) Cilegon mengajak masyarakat meningkatkan kewaspadaan terhadap potensi banjir di lingkungan masing-masing. Upaya pencegahan diminta dilakukan sejak dini melalui kegiatan gotong royong, terutama dengan membersihkan saluran drainase dan menjaga kebersihan lingkungan.",
      "Wali Kota Cilegon Robinsar mengimbau seluruh lapisan masyarakat, mulai dari tingkat RT, RW, kelurahan hingga kecamatan, untuk terlibat aktif dalam mengantisipasi dampak musim hujan. Menurutnya, kebersihan saluran air menjadi salah satu faktor penting dalam mencegah terjadinya genangan maupun banjir.",
      "\"Kami mengajak seluruh masyarakat, RT, RW, lurah dan camat untuk turun langsung melakukan gotong royong membersihkan drainase,\" ujar Robinsar, Kamis (19/11/2026).",
      "Ia menegaskan, kebiasaan membuang sampah ke sungai dapat menghambat aliran air dan meningkatkan risiko banjir, terutama ketika intensitas hujan meningkat. Robinsar juga meminta masyarakat mulai memetakan dan membersihkan titik-titik yang berpotensi menimbulkan genangan di wilayah masing-masing.",
      "Pemkot Cilegon, lanjut Robinsar, akan melibatkan jajaran kewilayahan bersama organisasi perangkat daerah (OPD) terkait untuk menindaklanjuti berbagai persoalan yang ditemukan masyarakat. \"OPD terkait pun akan menindaklanjuti apa yang menjadi keluhan di masyarakat,\" katanya.",
      "Di sejumlah kelurahan, kegiatan kerja bakti dilakukan dengan melibatkan karang taruna, PKK, dan kelompok masyarakat setempat. Warga membersihkan gorong-gorong, memangkas pohon yang menutup saluran, serta mengangkut sedimen yang menghambat aliran air.",
      "Ia berharap upaya pencegahan banjir tidak hanya menjadi tanggung jawab pemerintah, tetapi juga membutuhkan partisipasi aktif seluruh elemen masyarakat. \"Bareng-bareng kita antisipasi bersama, agar banjir bisa kita kontrol,\" pungkasnya.",
    ],
    cover_image: `${V}/278908_0.jpg`,
    category_slug: "pembangunan",
    district_slug: "jombang",
    village_slug: "jombang-wetan",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Rilis Diskominfo Kota Cilegon",
    source_url:
      "https://berita.cilegon.go.id/baca/Jelang-Musim-Hujan,-Robinsar-Ajak-Warga-Cilegon-Gotong-Royong-Cegah-Banjir/20261123/Mjc4OTA4",
    published_at: "2026-11-20T07:30:00+07:00",
    views: 2875,
    is_headline: false,
    status: "published",
  },
  {
    slug: "posyandu-kelurahan-layanan-kesehatan-terdekat",
    title: "Posyandu Kelurahan Jadi Garda Terdepan Layanan Kesehatan Ibu dan Anak",
    excerpt:
      "Puluhan Posyandu aktif di 43 kelurahan melayani penimbangan, imunisasi, dan konseling gizi. Kader kesehatan mengajak warga memanfaatkan layanan gratis ini.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Posyandu di tingkat kelurahan kembali menggeliat setelah jadwal pelayanan rutin bulanan dilanjutkan di seluruh wilayah Kota Cilegon. Balai kelurahan, aula RW, hingga pendopo masjid bergantian menjadi lokasi pelayanan penimbangan balita, imunisasi, dan konseling gizi.",
      "Setiap bulan, kader Posyandu bersama petugas puskesmas kelurahan mendata pertumbuhan anak, memberikan vitamin A, serta mengedukasi orang tua tentang pemenuhan gizi seimbang. Warga cukup membawa Buku Kesehatan Ibu dan Anak (KIA) untuk mendapatkan layanan tanpa biaya.",
      "Salah satu kader Posyandu menyampaikan bahwa tantangan terbesar bukan pada ketersediaan layanan, melainkan pada memastikan seluruh balita hadir secara rutin. \"Kami biasanya mengingatkan lewat grup WhatsApp RT. Kalau ada yang belum datang, kader mendatangi rumahnya,\" ujarnya.",
      "Layanan Posyandu juga menyasar ibu hamil dan lansia. Pemeriksaan tekanan darah, tes gula darah sederhana, serta konsultasi kesehatan menjadi agenda tetap yang diminati warga.",
      "Pemerintah Kota Cilegon melalui Dinas Kesehatan terus mendorong penguatan Posyandu sebagai ujung tombak pelayanan kesehatan primer. Warga diimbau aktif bertanya kepada kader atau puskesmas terdekat mengenai jadwal Posyandu di kelurahannya.",
    ],
    cover_image: `${V}/299228_0.jpg`,
    category_slug: "kesehatan",
    district_slug: "cibeber",
    village_slug: "cibeber",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-21T09:10:00+07:00",
    views: 1940,
    is_headline: false,
    status: "published",
  },
  {
    slug: "umkm-kelurahan-naik-kelas-pasar-digital",
    title: "UMKM Kelurahan Naik Kelas, Pelaku Usaha Rumahan Mulai Jualan di Pasar Digital",
    excerpt:
      "Program pendampingan UMKM menyasar pelaku usaha rumahan di kelurahan. Dari keripik hingga katering, omzet kini tumbuh lewat kanal daring.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Deretan pelaku usaha mikro di kawasan kelurahan mulai merambah pasar digital setelah mengikuti pendampingan pemasaran yang digelar bersamaan dengan festival UMKM tingkat kecamatan.",
      "Produk yang dijual pun beragam: keripik pisang, sambal kemasan, kue kering, hingga jasa katering rumahan. Sebagian pelaku usaha mengaku omzetnya naik setelah produk mereka dipromosikan lewat media sosial dan katalog daring.",
      "\"Dulu jualan hanya lewat tetangga. Sekarang pesanan bisa datang dari luar kecamatan, bahkan luar kota,\" ujar salah satu pelaku UMKM.",
      "Pendampingan mencakup pelatihan foto produk, penulisan deskripsi, pengemasan, hingga pencatatan keuangan sederhana. Pemerintah kelurahan menyediakan ruang promosi di balai warga serta mendorong kolaborasi dengan BUMDes dan koperasi setempat.",
      "Pelaku usaha berharap program serupa berlanjut, terutama untuk pendampingan perizinan usaha serta akses permodalan yang lebih mudah bagi usaha mikro skala rumahan.",
    ],
    cover_image: `${V}/271857_0.jpg`,
    category_slug: "ekonomi",
    district_slug: "citangkil",
    village_slug: "citangkil",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-20T13:45:00+07:00",
    views: 2360,
    is_headline: false,
    status: "published",
  },
  {
    slug: "literasi-warga-perpustakaan-keliling",
    title: "Perpustakaan Keliling Sambangi Kelurahan, Budaya Literasi Tumbuh dari Balai Warga",
    excerpt:
      "Mobil perpustakaan keliling rutin berkeliling menyambangi kelurahan dan sekolah dasar. Anak-anak antusias membaca di halaman balai warga.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Halaman balai kelurahan berubah menjadi taman baca dadakan ketika mobil perpustakaan keliling datang. Anak-anak sekolah dasar berdatangan memilih buku cerita, komik edukatif, hingga buku pelajaran.",
      "Program literasi ini menyasar kelurahan dan sekolah dasar di seluruh wilayah kota. Selain meminjamkan buku, petugas menggelar sesi mendongeng dan lomba mewarnai untuk menumbuhkan minat baca sejak dini.",
      "\"Anak-anak justru lebih semangat kalau bukunya bisa dipegang langsung. Karena itu kami terus berkeliling,\" kata petugas perpustakaan keliling.",
      "Pengurus kelurahan menyambut baik program tersebut dan berencana menyediakan pojok baca permanen di balai warga agar minat baca tetap terjaga meski mobil perpustakaan tidak hadir setiap hari.",
      "Warga yang ingin mengusulkan lokasi kunjungan perpustakaan keliling dapat menyampaikan usulan melalui kantor kelurahan masing-masing.",
    ],
    cover_image: `${V}/290742_0.jpg`,
    category_slug: "pendidikan",
    district_slug: "pulomerak",
    village_slug: "tamansari",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-19T10:20:00+07:00",
    views: 1755,
    is_headline: false,
    status: "published",
  },
  {
    slug: "karang-taruna-olahraga-warga-turnamen-kelurahan",
    title: "Karang Taruna Gelar Turnamen Antar-RT, Lapangan Kelurahan Jadi Arena Kebersamaan",
    excerpt:
      "Turnamen futsal dan voli antar-RT berlangsung meriah. Selain mencari bibit atlet, kegiatan ini mempererat kerukunan warga kelurahan.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Lapangan kelurahan penuh sorak sorai saat turnamen antar-RT digelar akhir pekan lalu. Cabang futsal, bola voli, dan bulu tangkis menjadi favorit warga dari berbagai usia.",
      "Kegiatan yang digagas karang taruna bersama pengurus RW ini diikuti puluhan tim. Selain memperebutkan piala bergilir, turnamen menjadi ajang silaturahmi antar-warga yang selama ini sibuk dengan aktivitas masing-masing.",
      "\"Tujuan utamanya bukan sekadar menang, tapi supaya warga antar-RT saling kenal dan kompak,\" ujar ketua karang taruna setempat.",
      "Pengurus kelurahan mendukung penuh kegiatan tersebut dan berharap dapat menjadi agenda tahunan. Beberapa peserta berbakat juga akan diusulkan mengikuti seleksi atlet tingkat kecamatan.",
      "Turnamen ditutup dengan pembagian hadiah serta santap bersama warga di halaman balai kelurahan.",
    ],
    cover_image: `${V}/243359_0.jpg`,
    category_slug: "olahraga",
    district_slug: "gerogol",
    village_slug: "rawa-arum",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-18T19:00:00+07:00",
    views: 1420,
    is_headline: false,
    status: "published",
  },
  {
    slug: "layanan-administrasi-kelurahan-terintegrasi-daring",
    title: "Layanan Administrasi Kelurahan Kini Terintegrasi Daring, Warga Tak Perlu Bolak-Balik",
    excerpt:
      "Pengurusan surat keterangan dan legalisasi dokumen mulai terhubung sistem daring. Warga cukup unggah berkas dan memantau status permohonan.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Warga kini dapat mengurus sejumlah layanan administrasi kependudukan tanpa harus bolak-balik ke kantor kelurahan. Sistem layanan daring memungkinkan pemohon mengunggah berkas dan memantau status permohonan dari rumah.",
      "Layanan yang tersedia antara lain surat keterangan domisili, surat keterangan usaha, pengantar SKCK, serta legalisasi dokumen. Setelah berkas dinyatakan lengkap, warga cukup datang sekali untuk pengambilan dokumen fisik bila diperlukan.",
      "\"Yang paling terasa adalah waktu. Dulu harus mengantre pagi, sekarang bisa diajukan malam hari,\" ujar seorang warga yang mencoba layanan tersebut.",
      "Petugas kelurahan tetap menyediakan pendampingan bagi warga yang belum terbiasa menggunakan layanan digital. Pos bantuan dibuka di kantor kelurahan setiap hari kerja.",
      "Pemerintah kota berharap integrasi layanan ini terus diperluas hingga seluruh jenis perizinan tingkat kelurahan dapat diakses secara daring.",
    ],
    cover_image: `${V}/140_0.jpg`,
    category_slug: "pemerintahan",
    district_slug: "purwakarta",
    village_slug: "pabean",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-17T11:05:00+07:00",
    views: 2610,
    is_headline: false,
    status: "published",
  },
  {
    slug: "bank-sampah-kelurahan-kurangi-timbulan-plastik",
    title: "Bank Sampah Kelurahan Tekan Timbulan Plastik, Warga Dapat Tabungan dari Memilah",
    excerpt:
      "Sejumlah bank sampah di kelurahan mencatat kenaikan partisipasi warga. Sampah anorganik ditukar menjadi tabungan dan sembako.",
    content: [
      "**CILEGON, INFO KELURAHAN** – Kesadaran warga memilah sampah terus tumbuh. Bank sampah di beberapa kelurahan mencatat kenaikan partisipasi, terutama dari ibu-ibu PKK dan karang taruna yang rutin menyetor sampah anorganik.",
      "Sampah plastik, kertas, dan logam ditimbang lalu dikonversi menjadi tabungan warga. Sebagian pengurus bank sampah juga menyediakan opsi penukaran dengan sembako dan alat tulis sekolah.",
      "\"Sekali setor mungkin nilainya kecil, tapi kalau rutin sebulan bisa lumayan untuk tambahan belanja,\" kata pengurus bank sampah.",
      "Program lingkungan ini sejalan dengan upaya pemerintah kota mengurangi sampah yang berakhir di tempat pembuangan akhir. Edukasi pemilahan terus dilakukan hingga tingkat RT, termasuk melalui kegiatan PKK dan dasawisma.",
      "Pengurus kelurahan berharap semakin banyak warga bergabung agar volume sampah yang dibuang ke TPA terus menurun dan lingkungan kelurahan semakin bersih.",
    ],
    cover_image: `${V}/271857_0.jpg`,
    category_slug: "sosial",
    district_slug: "citangkil",
    village_slug: "lebakdenok",
    author: "Redaksi Info Kelurahan",
    editor: "Editorial contoh",
    source: "Info Kelurahan",
    source_url: "",
    published_at: "2026-11-15T08:40:00+07:00",
    views: 2085,
    is_headline: false,
    status: "published",
  },
];

export const SEED_POSTS: Seed[] = SEEDS;

export const SEED_ANNOUNCEMENTS = [
  {
    title: "Pelayanan Administrasi Kelurahan Selama Libur Akhir Tahun 2026",
    body: "Pelayanan administrasi di seluruh kantor kelurahan Kota Cilegon tetap dibuka terbatas pada 29–31 Desember 2026, pukul 08.00–12.00 WIB. Layanan daring tetap dapat diakses 24 jam melalui portal kelurahan.",
    level: "layanan" as const,
    published_at: "2026-11-21T08:00:00+07:00",
    expires_at: "2026-12-31T23:59:59+07:00",
    is_active: true,
  },
  {
    title: "Gotong Royong Serentak Bersihkan Drainase Jelang Musim Hujan",
    body: "Seluruh kelurahan menggelar kerja bakti serentak pada Minggu, 23 November 2026, pukul 07.00 WIB. Warga diimbau membawa peralatan kebersihan dan berkumpul di titik kumpul RT masing-masing.",
    level: "penting" as const,
    published_at: "2026-11-20T09:30:00+07:00",
    expires_at: "2026-11-30T23:59:59+07:00",
    is_active: true,
  },
  {
    title: "Perekaman KTP-el dan Akta Kelahiran di Balai Kelurahan",
    body: "Dinas Kependudukan dan Pencatatan Sipil membuka layanan jemput bola perekaman KTP-el dan pencatatan akta kelahiran di balai kelurahan sesuai jadwal yang diumumkan di papan informasi kelurahan.",
    level: "info" as const,
    published_at: "2026-11-18T10:00:00+07:00",
    expires_at: null,
    is_active: true,
  },
];

export const SEED_AGENDAS = [
  {
    title: "Musyawarah Perencanaan Pembangunan Kelurahan",
    description: "Penjaringan usulan warga untuk rencana kerja pembangunan tahun mendatang. Dihadiri perwakilan RT/RW, tokoh masyarakat, dan BKM.",
    location: "Balai Kelurahan masing-masing",
    starts_at: "2026-11-25T08:00:00+07:00",
    ends_at: "2026-11-25T12:00:00+07:00",
    organizer: "Pemerintah Kelurahan",
    district_slug: null,
  },
  {
    title: "Posyandu Balita dan Lansia Serentak",
    description: "Pelayanan penimbangan balita, imunisasi dasar lengkap, vitamin A, dan pemeriksaan kesehatan lansia gratis.",
    location: "Posyandu di tiap kelurahan",
    starts_at: "2026-11-27T08:00:00+07:00",
    ends_at: "2026-11-27T11:30:00+07:00",
    organizer: "Puskesmas & Kader Posyandu",
    district_slug: null,
  },
  {
    title: "Festival UMKM Kecamatan Citangkil",
    description: "Pameran produk usaha mikro, pelatihan pemasaran digital, dan bazar kuliner khas Cilegon.",
    location: "Lapangan Kecamatan Citangkil",
    starts_at: "2026-11-29T09:00:00+07:00",
    ends_at: "2026-11-30T21:00:00+07:00",
    organizer: "Kecamatan Citangkil & Dinas Koperasi UKM",
    district_slug: "citangkil",
  },
  {
    title: "Sosialisasi Kesiapsiagaan Bencana Tingkat Kelurahan",
    description: "Simulasi evakuasi dan pemetaan jalur aman bersama BPBD Kota Cilegon untuk pengurus RT/RW.",
    location: "Aula Kecamatan Ciwandan",
    starts_at: "2026-12-02T08:30:00+07:00",
    ends_at: "2026-12-02T13:00:00+07:00",
    organizer: "BPBD Kota Cilegon",
    district_slug: "ciwandan",
  },
];

/**
 * Draf contoh — memberi dashboard redaksi variasi status sejak awal.
 * Tidak tampil di situs publik sampai diterbitkan admin.
 */
export const SEED_DRAFTS: NewPostInput[] = [
  {
    title: "Pemkot Cilegon Siapkan Program Pelatihan Keterampilan untuk Warga Kelurahan",
    excerpt:
      "Draf: program pelatihan kerja sama Disnaker dan perusahaan kawasan industri untuk warga 43 kelurahan.",
    content: [
      "Draf ini menunggu konfirmasi narasumber dari Dinas Tenaga Kerja Kota Cilegon sebelum diterbitkan.",
      "Rencana program mencakup pelatihan keterampilan teknis, sertifikasi kompetensi, dan penyaluran kerja bagi warga kelurahan.",
      "Redaksi akan melengkapi kutipan pejabat, jadwal pelatihan, serta persyaratan pendaftaran pada versi final.",
    ],
    cover_image: "",
    category_slug: "ekonomi",
    district_slug: null,
    village_slug: null,
    author: "Redaksi Info Kelurahan",
    is_headline: false,
    status: "draft",
  },
];
