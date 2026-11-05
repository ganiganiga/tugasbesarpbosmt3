# Jelajah Gunung Jabar - Paket UI (Razor View + CSS + JS)

Hanya View, CSS, JS, dan 1 gambar placeholder. Tidak ada project, Model, atau database baru.
Salin folder `Views/` dan `wwwroot/` ke project ASP.NET Core MVC yang sudah ada (gabungkan folder).

## Lokasi file
| File | Fungsi |
|---|---|
| Views/Shared/_Layout.cshtml | Layout publik (header, footer) |
| Views/Shared/_AdminLayout.cshtml | Layout admin (sidebar) |
| Views/Shared/_DestinationCard.cshtml | Partial card destinasi |
| Views/Shared/_Icon.cshtml | Partial ikon SVG |
| Views/Home/Index.cshtml | 1. Homepage |
| Views/Destinations/Index.cshtml | 2. Katalog + pencarian + filter |
| Views/Destinations/Details.cshtml | 3. Detail destinasi |
| Views/Admin/Dashboard.cshtml | 4. Dashboard admin |
| Views/Admin/_DestinationForm.cshtml | Partial form |
| Views/Admin/Create.cshtml, Edit.cshtml | 5. Form tambah / edit |
| wwwroot/css/site.css, wwwroot/js/site.js | Gaya & interaksi |
| wwwroot/images/placeholder-gunung.svg | Fallback foto |

Siapkan foto sendiri (berlisensi): `wwwroot/images/hero-gunung.jpg` (hero) dan `wwwroot/images/cta-camping.jpg` (banner). Jika belum ada, tampil gradasi hijau.

## Asumsi (sesuaikan bila beda)
1. Tambahkan di `Views/_ViewImports.cshtml`: `@using NamaProjectAnda.Models`
2. Model sesuai PRD bagian 13: `Destination` (DestinationId, Name, Description, Height, Region, Address, TicketPrice, OpeningHours, ImageUrl, MapsUrl, Difficulty, IsActive, DestinationCategories, DestinationFacilities), `Category` (CategoryId, CategoryName), `Facility` (FacilityId, FacilityName), join entity `DestinationCategory.Category` dan `DestinationFacility.Facility`. Jika nama properti navigasi berbeda, ganti di `_DestinationCard`, `Details`.
3. Controller: `HomeController.Index`, `DestinationsController.Index/Details`, `AdminController.Dashboard/Create/Edit/ToggleActive`. Jika nama berbeda, ubah `asp-controller` / `asp-action`.
4. `Difficulty` bertipe string. Foto bisa diunggah (`imageFile`) atau diisi lewat `ImageUrl`.
5. Link "Masuk" di `_Layout` mengarah ke `~/Identity/Account/Login`; ganti sesuai proyek.

## Data yang dibaca View (dari controller yang sudah ada)
| View | @model | ViewBag |
|---|---|---|
| Home/Index | IEnumerable<Destination> (aktif) | Regions (List<string>), Categories (IEnumerable<Category>) |
| Destinations/Index | IEnumerable<Destination> (sudah terfilter, aktif) | Regions, Categories |
| Destinations/Details | Destination (+ Include kategori, fasilitas) | Related (opsional) |
| Admin/Dashboard | IEnumerable<Destination> (semua) | - |
| Admin/Create, Edit | Destination | Regions, Categories, Facilities, SelectedCategoryIds, SelectedFacilityIds (IEnumerable<int>) |

Form mengirim: field Destination, `int[] selectedCategoryIds`, `int[] selectedFacilityIds`, `IFormFile imageFile`.
Query katalog: `q`, `region`, `category` (CategoryName). ToggleActive: POST `Admin/ToggleActive/{id}` (antiforgery otomatis).

Contoh filter katalog:
```csharp
var query = _context.Destinations
    .Include(d => d.DestinationCategories).ThenInclude(dc => dc.Category)
    .Where(d => d.IsActive);
if (!string.IsNullOrWhiteSpace(q)) query = query.Where(d => d.Name.Contains(q));
if (!string.IsNullOrWhiteSpace(region)) query = query.Where(d => d.Region == region);
if (!string.IsNullOrWhiteSpace(category))
    query = query.Where(d => d.DestinationCategories.Any(dc => dc.Category.CategoryName == category));
```
Lindungi AdminController dengan `[Authorize(Roles = "Admin")]`.
