# Setup dari nol - Jelajah Gunung Jabar (ASP.NET Core MVC + EF Core + SQL Server)

Namespace yang dipakai: `GEPREK71` (sesuai nama folder project). Jika nama project berbeda,
cari-ganti `GEPREK71` di semua file .cs dan di Views/_ViewImports.cshtml.

## 1. Buat project MVC di folder GEPREK71
Buka terminal di folder project (D:\...\GEPREK71):
    dotnet new mvc -n GEPREK71 -o . --force
`--force` menimpa Views/wwwroot lama. Setelah itu LANGKAH 2 menimpa kembali dengan file dari zip.

## 2. Ekstrak zip ini ke folder project, pilih "Replace / timpa semua"
Posisi file:
    GEPREK71/
    ├─ Program.cs
    ├─ appsettings.json
    ├─ Controllers/  Home, Destinations, Account, Admin
    ├─ Data/         ApplicationDbContext.cs, SeedData.cs
    ├─ Models/       Destination, Category, Facility, DestinationCategory, DestinationFacility
    ├─ Views/        (Admin, Account, Destinations, Home, Shared, _ViewStart, _ViewImports)
    └─ wwwroot/      css, js, images

Hapus file bawaan template yang tidak dipakai: Views/Home/Privacy.cshtml, Views/Shared/_Layout.cshtml.css.

## 3. Install paket (cek versi .NET dulu: dotnet --version)
Ganti 9.* sesuai versi .NET Anda (8.* / 9.* / 10.*):
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 9.*
    dotnet add package Microsoft.EntityFrameworkCore.Tools --version 9.*
    dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 9.*
    dotnet tool install --global dotnet-ef

## 4. Buat migrasi (sekali saja)
    dotnet ef migrations add InitialCreate

Database dibuat otomatis saat aplikasi pertama dijalankan (Program.cs memanggil Migrate + seed).

## 5. Jalankan
    dotnet run
Buka alamat yang tampil (https://localhost:xxxx).

Login admin awal: admin@jelajahgunung.id / Admin@12345  (segera ganti di Data/SeedData.cs sebelum deploy)

## Catatan
- Connection string memakai SQL Server LocalDB (ikut Visual Studio). Jika tidak ada, ubah di appsettings.json,
  contoh: Server=.\\SQLEXPRESS;Database=JelajahGunungJabarDb;Trusted_Connection=True;TrustServerCertificate=True
- Foto hero/banner: taruh hero-gunung.jpg dan cta-camping.jpg di wwwroot/images/.
- Foto destinasi yang diunggah admin tersimpan di wwwroot/images/destinasi/.
- Data destinasi contoh tidak mengisi harga tiket, jam buka, dan fasilitas (belum terverifikasi); isi lewat Dashboard Admin.
