import type { District, Village } from "./types";

/**
 * Data kewilayahan Kota Cilegon: 8 kecamatan & 43 kelurahan.
 * Sumber struktur: Kota Cilegon dalam angka (BPS) & Kemendagri.
 *
 * Catatan: alamat kantor, nomor telepon, dan email di bawah adalah
 * DATA CONTOH untuk keperluan demo produk. Perbarui melalui dashboard
 * admin (/admin/kelurahan) dengan data resmi masing-masing kelurahan.
 */

export const DISTRICTS: District[] = [
  {
    id: 1,
    slug: "cibeber",
    name: "Cibeber",
    code: "36.72.01",
    description:
      "Kecamatan di sisi selatan Cilegon dengan lanskap perbukitan dan kawasan industri. Pusat pemerintahan kecamatan berada di Kelurahan Cibeber.",
    area_km2: 21.49,
    kelurahan_count: 6,
    accent: "#f85e16",
  },
  {
    id: 2,
    slug: "cilegon",
    name: "Cilegon",
    code: "36.72.02",
    description:
      "Jantung kota dengan luas terkecil namun paling padat aktivitas. Pusat pemerintahan kecamatan berada di Kelurahan Ciwaduk.",
    area_km2: 9.15,
    kelurahan_count: 5,
    accent: "#e9440c",
  },
  {
    id: 3,
    slug: "pulomerak",
    name: "Pulomerak",
    code: "36.72.03",
    description:
      "Menghadap Selat Sunda dengan kawasan pesisir dan energi. Pusat pemerintahan kecamatan berada di Kelurahan Tamansari.",
    area_km2: 19.86,
    kelurahan_count: 4,
    accent: "#0891b2",
  },
  {
    id: 4,
    slug: "ciwandan",
    name: "Ciwandan",
    code: "36.72.04",
    description:
      "Kecamatan terluas di Kota Cilegon, rumah bagi kawasan industri dan pelabuhan. Pusat pemerintahan berada di Kelurahan Tegalratu.",
    area_km2: 51.81,
    kelurahan_count: 6,
    accent: "#ca8a04",
  },
  {
    id: 5,
    slug: "jombang",
    name: "Jombang",
    code: "36.72.05",
    description:
      "Kawasan permukiman padat dan pusat perdagangan kota. Pusat pemerintahan kecamatan berada di Kelurahan Jombang Wetan.",
    area_km2: 11.55,
    kelurahan_count: 5,
    accent: "#db2777",
  },
  {
    id: 6,
    slug: "gerogol",
    name: "Gerogol",
    code: "36.72.06",
    description:
      "Kawasan pesisir barat dengan pelabuhan dan industri. Pusat pemerintahan kecamatan berada di Kelurahan Gerogol.",
    area_km2: 23.38,
    kelurahan_count: 4,
    accent: "#0d9488",
  },
  {
    id: 7,
    slug: "purwakarta",
    name: "Purwakarta",
    code: "36.72.07",
    description:
      "Pusat kota lama Cilegon dengan deretan pasar, pertokoan, dan bangunan bersejarah. Pusat pemerintahan berada di Kelurahan Purwakarta.",
    area_km2: 15.29,
    kelurahan_count: 6,
    accent: "#4f46e5",
  },
  {
    id: 8,
    slug: "citangkil",
    name: "Citangkil",
    code: "36.72.08",
    description:
      "Kecamatan dengan jumlah kelurahan terbanyak, tumbuh sebagai kawasan hunian baru. Pusat pemerintahan berada di Kelurahan Kebonsari.",
    area_km2: 22.98,
    kelurahan_count: 7,
    accent: "#7c3aed",
  },
];

type RawVillage = [name: string, district: string, postal: string, note: string];

const RAW: RawVillage[] = [
  // Cibeber
  ["Bulakan", "cibeber", "42426", "Kawasan perbukitan dengan lahan pertanian dan tambang galian C yang menjadi denyut ekonomi warga."],
  ["Cibeber", "cibeber", "42423", "Pusat pemerintahan Kecamatan Cibeber dengan akses utama menuju Jalan Raya Cibeber."],
  ["Cikerai", "cibeber", "42427", "Wilayah selatan Cilegon yang berbatasan dengan Kabupaten Serang dan kaya akan lahan hijau."],
  ["Kalitimbang", "cibeber", "42424", "Permukiman yang tumbuh cepat sebagai kawasan penyangga industri di sisi selatan kota."],
  ["Karangasem", "cibeber", "42425", "Kawasan dengan sentra UMKM rumahan dan jaringan jalan penghubung antar-kecamatan."],
  ["Kedaleman", "cibeber", "42422", "Kelurahan bersejarah yang menjadi salah satu pintu masuk kota dari arah selatan."],

  // Cilegon
  ["Bagendung", "cilegon", "42419", "Permukiman di tepi timur kota dengan aktivitas pertanian dan industri kecil."],
  ["Bendungan", "cilegon", "42418", "Kawasan padat dengan pasar tradisional dan sentra kuliner yang ramai setiap hari."],
  ["Ciwaduk", "cilegon", "42415", "Pusat pemerintahan Kecamatan Cilegon sekaligus lokasi sejumlah kantor dinas kota."],
  ["Ciwedus", "cilegon", "42416", "Wilayah strategis dekat pusat kota dengan deretan pertokoan dan jasa."],
  ["Ketileng", "cilegon", "42417", "Kawasan permukiman lama dengan masjid tua dan tradisi gotong royong yang kuat."],

  // Pulomerak
  ["Lebakgede", "pulomerak", "42439", "Kawasan pesisir dengan aktivitas nelayan dan pandangan langsung ke Selat Sunda."],
  ["Mekarsari", "pulomerak", "42438", "Wilayah berbukit dengan kawasan industri dan perumahan pekerja."],
  ["Suralaya", "pulomerak", "42439", "Dikenal sebagai lokasi pembangkit listrik dan kampung pesisir dengan panorama laut."],
  ["Tamansari", "pulomerak", "42438", "Pusat pemerintahan Kecamatan Pulomerak dengan akses jalan utama menuju Merak."],

  // Ciwandan
  ["Banjarnegara", "ciwandan", "42447", "Kecamatan terluas: kawasan industri berat dan pelabuhan yang menopang ekonomi kota."],
  ["Gunungsugih", "ciwandan", "42448", "Wilayah berbukit dengan kawasan industri dan permukiman pekerja pabrik."],
  ["Kepuh", "ciwandan", "42445", "Kelurahan pesisir dengan dermaga rakyat dan aktivitas perdagangan hasil laut."],
  ["Kubangsari", "ciwandan", "42446", "Kawan penyangga industri dengan jaringan transportasi yang sibuk setiap hari."],
  ["Randakari", "ciwandan", "42449", "Permukiman pesisir dengan potensi perikanan dan usaha kuliner rumahan."],
  ["Tegalratu", "ciwandan", "42445", "Pusat pemerintahan Kecamatan Ciwandan dan simpul transportasi barang."],

  // Jombang
  ["Gedong Dalem", "jombang", "42413", "Kawasan permukiman padat yang berkembang menjadi sentra jasa dan perdagangan."],
  ["Jombang Wetan", "jombang", "42411", "Pusat pemerintahan Kecamatan Jombang sekaligus kawasan pertokoan paling ramai."],
  ["Masigit", "jombang", "42414", "Kampung kota dengan pasar dan sentra makanan yang hidup hingga malam."],
  ["Panggung Rawi", "jombang", "42412", "Permukiman dengan akses langsung ke jalan nasional dan pusat perbelanjaan."],
  ["Sukmajaya", "jombang", "42413", "Kawasan hunian baru dengan fasilitas pendidikan dan ruang terbuka hijau."],

  // Gerogol
  ["Gerem", "gerogol", "42436", "Kelurahan pesisir dengan dermaga penyeberangan dan aktivitas industri."],
  ["Gerogol", "gerogol", "42436", "Pusat pemerintahan Kecamatan Gerogol dengan kawasan pelabuhan yang sibuk."],
  ["Kotasari", "gerogol", "42436", "Wilayah industri dan permukiman dengan akses tol serta jalan lingkar selatan."],
  ["Rawa Arum", "gerogol", "42436", "Kawasan pesisir dengan tambak, mangrove, dan potensi wisata bahari."],

  // Purwakarta
  ["Kebondalem", "purwakarta", "42433", "Kawasan kota lama dengan pasar tradisional dan jejak sejarah Cilegon."],
  ["Kotabumi", "purwakarta", "42434", "Permukiman tertata dekat alun-alun dengan sejumlah fasilitas publik."],
  ["Pabean", "purwakarta", "42437", "Sentra perdagangan dan jasa, ramai oleh aktivitas pasar sejak pagi."],
  ["Purwakarta", "purwakarta", "42431", "Pusat pemerintahan Kecamatan Purwakarta dan salah satu kawasan tertua di kota."],
  ["Ramanuju", "purwakarta", "42432", "Wilayah permukiman dekat pusat kota dengan akses mudah ke layanan publik."],
  ["Tegalbunder", "purwakarta", "42434", "Kawasan hunian dengan industri kecil dan sentra kuliner khas Cilegon."],

  // Citangkil
  ["Citangkil", "citangkil", "42441", "Kelurahan inti dengan fasilitas pendidikan dan pasar yang melayani warga sekitar."],
  ["Deringo", "citangkil", "42444", "Wilayah selatan dengan lahan pertanian dan permukiman yang asri."],
  ["Kebonsari", "citangkil", "42442", "Pusat pemerintahan Kecamatan Citangkil dan simpul layanan publik."],
  ["Lebakdenok", "citangkil", "42443", "Permukiman tenang dengan ruang terbuka hijau dan kegiatan keagamaan aktif."],
  ["Samangraya", "citangkil", "42444", "Kawasan industri kecil dan permukiman pekerja di sisi selatan kota."],
  ["Tamanbaru", "citangkil", "42443", "Wilayah dengan deretan perumahan baru dan fasilitas olahraga warga."],
  ["Warnasari", "citangkil", "42441", "Kawasan hunian berkembang dengan akses cepat ke pusat kota dan tol."],
];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function phoneFor(index: number): string {
  return `(0254) 3${(71000 + index * 37).toString().slice(0, 5)}`;
}

export const VILLAGES: Village[] = RAW.map(([name, district, postal, profile], i) => {
  const slug = slugify(name);
  return {
    id: i + 1,
    slug,
    name,
    district_slug: district,
    postal_code: postal,
    address: `Jl. Raya ${name} No. 1, Kec. ${DISTRICTS.find((d) => d.slug === district)?.name}, Kota Cilegon ${postal}`,
    phone: phoneFor(i),
    email: `kel.${slug.replace(/-/g, "")}@cilegon.go.id`,
    profile,
    latitude: -6.02 + ((i % 8) * 0.012 - 0.02),
    longitude: 106.03 + (Math.floor(i / 8) * 0.03 - 0.04),
    head_name: "",
  };
});

export const VILLAGE_MAP: Record<string, Village> = Object.fromEntries(
  VILLAGES.map((v) => [v.slug, v]),
);

export const DISTRICT_MAP: Record<string, District> = Object.fromEntries(
  DISTRICTS.map((d) => [d.slug, d]),
);

export function villagesOfDistrict(districtSlug: string): Village[] {
  return VILLAGES.filter((v) => v.district_slug === districtSlug);
}

export function getVillage(slug: string | null | undefined): Village | undefined {
  if (!slug) return undefined;
  return VILLAGE_MAP[slug];
}

export function getDistrict(slug: string | null | undefined): District | undefined {
  if (!slug) return undefined;
  return DISTRICT_MAP[slug];
}

export const WILAYAH_STATS = {
  districts: DISTRICTS.length,
  villages: VILLAGES.length,
  area: DISTRICTS.reduce((sum, d) => sum + d.area_km2, 0),
  population: "±420.000 jiwa",
};
