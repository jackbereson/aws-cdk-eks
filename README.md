# GENERATE DATA TOOL

install hygen

`npm i -g hygen`

## GENERATE COMPONENT

`hygen generate component <name>`

## GENERATE ROUTE

`hygen generate route <name>`

## GENERATE SERVICE

`hygen generate service <name>`

## GENERATE MIGRATION

#### COMMAND

`hygen generate migration`


## Các động từ nên dùng trong message title
Add = Thêm vào mã nguồn. Ví dụ: chức năng, test, thư viện
Drop = Xóa khỏi mã nguồn. Ví dụ: chức năng, test, thư viện
Fix = Sửa trong mã nguồn. Ví dụ: lỗi, typo
Bump = Thay đổi version. Ví dụ: nâng phiên bản một thư viện đang sử dụng
Make = Thay đổi công cụ hoặc quy trình build liên quan hạ tầng
Refactor = Sửa đổi nhằm mục đích tái cấu trúc mã nguồn cũ. Ví dụ: Tách logic xử lý trong controller layer về business layer
Optimize = Sửa đổi nhằm mục đích tối ưu hiệu năng cho mã nguồn cũ. Ví dụ: Tối ưu hiệu năng chức năng tìm kiếm đơn hàng bằng cách sử dụng thêm caching layer để giảm thời gian truy vấn từ cơ sở dữ liệu.
Reformat = Sửa đổi nhằm mục đích định dạng lại code cũ. Ví dụ: xóa khoảng trắng, dòng trắng sai coding convention
Rephrase = Sửa đổi liên quan tài liệu trong source code. Ví dụ comment trong source code (TODO / FIXME / …)
Document = Sửa đổi liên quan đến tài liệu bên ngoài source code. Ví dụ thêm mô tả vào file README.md