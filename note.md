untuk pembayaran
Sisi member
- user bisa ngecek tagihan perbulan atau ter utang lewat web dengan data primary bill
- jika billnya utang maka di tampilkan total dan sisa pembayaran
- user bisa checkout bill nya maka tercipta payment sesuai kategorinya

Sisi admin
- admin bisa membuatkan payment secara manual jika bayarnya manual lewat kontak komunikasi
- di new payment form akan di sesuaikan dengan kategori dari bill nya, jika one time, utang, recurring
- jika bill itu recurring maka akan ditagih sesuai konfigurasinya
- admin bisa memberi link payment, atau email ke customernnya
- ketika validate harus dipastikan ada pengecekan debt telah mencapai total jika paymentnnya debt. untuk jaga jaga agar tidak terjadi total yang melebihi harga total sebenernya [Buat kondisi di front end]