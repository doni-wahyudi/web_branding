const siteConfig = {
  // Tokoh
  name: "Bagas Pramono",
  title: "Anggota DPRD Provinsi Lampung",
  fullTitle: "Anggota DPRD Provinsi Lampung",
  party: "Partai GEMA",
  partyFull: "Gerakan Muda Mendunia",
  dapil: "Dapil Lampung (Provinsi)",
  tagline: "Suara Rakyat, Perjuangan Nyata",
  subtitle: "Bersama kita wujudkan perubahan nyata untuk masyarakat Lampung. Setiap aspirasi Anda adalah amanah dan perjuangan kami.",
  
  // Contact
  whatsapp: "6281234567890",
  email: "bagas.pramono@gema.id",
  address: "Kantor DPRD Provinsi Lampung, Jl. Wolter Monginsidi No. 69, Bandar Lampung",
  
  // Social Media
  social: {
    instagram: "https://instagram.com/bagaspramono",
    facebook: "https://facebook.com/bagaspramono",
    twitter: "https://twitter.com/bagaspramono",
    youtube: "https://youtube.com/@bagaspramono",
    tiktok: "https://tiktok.com/@bagaspramono",
  },

  // Stats
  stats: [
    { label: "Aspirasi Ditangani", value: 1247, suffix: "+" },
    { label: "Tahun Mengabdi", value: 8, suffix: " Tahun" },
    { label: "Perda Dikawal", value: 23, suffix: " Perda" },
    { label: "Wilayah Dijangkau", value: 15, suffix: " Kab/Kota" },
  ],

  // Lampung Kabupaten & Kecamatan mapping for dynamic forms
  kabupatenKecamatan: {
    "Kota Bandar Lampung": ["Kedaton", "Rajabasa", "Sukarame", "Tanjung Karang Pusat", "Teluk Betung Selatan"],
    "Kota Metro": ["Metro Barat", "Metro Pusat", "Metro Selatan", "Metro Timur", "Metro Utara"],
    "Kabupaten Lampung Selatan": ["Bakauheni", "Jati Agung", "Kalianda", "Natar", "Sidomulyo"],
    "Kabupaten Lampung Tengah": ["Gunung Sugih", "Kalirejo", "Rumbia", "Seputih Banyak", "Terbanggi Besar"],
    "Kabupaten Lampung Utara": ["Abung Selatan", "Bukit Kemuning", "Kotabumi", "Sungkai Utara"],
    "Kabupaten Lampung Barat": ["Balik Bukit", "Liwa", "Sekincau", "Sumber Jaya", "Way Tenong"],
    "Kabupaten Lampung Timur": ["Labuhan Maringgai", "Pekalongan", "Sekampung", "Sukadana", "Way Jepara"],
    "Kabupaten Tanggamus": ["Gisting", "Kota Agung", "Pulau Panggung", "Talang Padang", "Wonosobo"],
    "Kabupaten Tulang Bawang": ["Banjar Agung", "Dente Teladas", "Gedung Meneng", "Menggala", "Penawartama"],
    "Kabupaten Tulang Bawang Barat": ["Lambu Kibang", "Tumijajar", "Tulang Bawang Tengah", "Tulang Bawang Udik"],
    "Kabupaten Way Kanan": ["Baradatu", "Blambangan Umpu", "Kasui", "Pakuan Ratu", "Rebang Tangkas"],
    "Kabupaten Pesawaran": ["Gedong Tataan", "Kedondong", "Padang Cermin", "Tegineneng", "Way Lima"],
    "Kabupaten Pringsewu": ["Ambarawa", "Gading Rejo", "Pagelaran", "Pringsewu", "Sukoharjo"],
    "Kabupaten Mesuji": ["Mesuji Timur", "Panca Jaya", "Simpang Pematang", "Tanjung Raya", "Way Serdang"],
    "Kabupaten Pesisir Barat": ["Krui", "Lemong", "Ngambur", "Pesisir Selatan", "Pesisir Tengah"]
  },

  // Fallback list of kecamatan
  kecamatan: [
    "Kedaton",
    "Natar",
    "Kalianda",
    "Metro Pusat",
    "Kotabumi",
    "Liwa",
    "Sukadana",
    "Gisting",
    "Menggala",
    "Baradatu",
    "Gedong Tataan",
    "Pringsewu",
    "Simpang Pematang",
    "Krui"
  ],

  // Aspiration categories
  categories: [
    "Infrastruktur",
    "Pendidikan",
    "Kesehatan",
    "Ekonomi",
    "Sosial",
    "Lingkungan",
    "Lainnya",
  ],
};

export default siteConfig;
