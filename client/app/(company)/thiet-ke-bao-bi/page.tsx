import { AspectRatio } from "@/components/ui/aspect-ratio";
import constants from "@/constants";
import Image from "next/image";

const PackageingDesign = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto pt-[30px] pb-[60px]">
        <div className="mx-5 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold sm:mb-6 mb-3 text-blue-400">
            THIẾT KẾ BAO BÌ MỸ PHẨM TẠI I.C.H
          </h1>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Chẳng một doanh nghiệp nào muốn sản phẩm của mình trông nhàm chán,
            thiếu thu hút và cũng không khách hàng nào chọn mua một món đồ trông
            đơn điệu & chẳng có chút điểm nhấn trong hàng nghìn sản phẩm khác.
            Đó là lý do thiết kế bao bì mỹ phẩm ngày càng được các doanh nghiệp
            chú ý hơn cho các dòng mỹ phẩm sắp ra mắt.
          </p>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Vậy thiết kế bao bì mỹ phẩm có tầm quan trọng như thế nào trong thời
            đại 4.0, mua sắm online ngày càng phổ biến và người tiêu dùng ngày
            càng kén chọn, cùng đi tìm câu trả lời trong bài viết hôm nay với
            I.C.H nhé.
          </p>
          <h2 className="text-xl text-red-500 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Thiết kế bao bì mỹ phẩm là gì?
          </h2>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Thiết kế bao bì mỹ phẩm được hiểu là tạo ra vẻ ngoài bắt mắt và cuốn
            hút cho sản phẩm, bao gồm các công đoạn lên ý tưởng, lựa chọn chất
            liệu, định hướng tone màu & phông chữ… đồng thời làm cho chúng trở
            nên hài hòa, sáng tạo và phù hợp với định hướng của doanh nghiệp.
          </p>
          <div className="max-w-[600px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={3 / 2}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Thiết kế bao bì mỹ phẩm có quan trọng không"
                  src={"/thiet-ke-bao-bi-my-pham-1.jpg"}
                  fill
                  sizes="(min-width: 700px) 600px, calc(95.79vw - 51px)"
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Thiết kế bao bì mỹ phẩm có quan trọng không
              </p>
            </div>
          </div>

          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Ngoài ra, thiết kế bao bì mỹ phẩm còn là cách phân bổ nội dung sao
            cho đầy đủ và giúp khách hàng nhận diện sản phẩm nhanh chóng.
          </p>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Một thiết kế bao bì mỹ phẩm có thể gọi là thành công nếu khách hàng
            cảm nhận câu chuyện sản phẩm thông qua diện mạo của chúng. Đó có thể
            là một trải nghiệm người dùng, cảm xúc thú vị thông qua thị giác,
            xúc giác…
          </p>
          <h2 className="text-xl text-red-500 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Tầm quan trọng của thiết kế bao bì mỹ phẩm
          </h2>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Tạo sự khác biệt
          </h3>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Theo thống kê, 95% khách hàng mua sắm hiện nay đều dựa trên bao bì
            để đánh giá sản phẩm có đáng để bỏ tiền ra không? Với các dòng mỹ
            phẩm hạng sang & cao cấp, yếu tố này chiếm tỷ trọng càng lớn.
          </p>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Thêm vào đó, một phân khúc mỹ phẩm có đến hàng nghìn sự lựa chọn
            khác nhau đến từ các thương hiệu lớn, nếu thiết kế bao bì mỹ phẩm
            của doanh nghiệp kém thu hút thì đó là bước đầu khiến chúng phải
            dừng chân trên cuộc chơi.
          </p>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Tăng nhận diện thương hiệu
          </h3>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Tính nguyên bản và khả năng nhận biết là những đặc điểm cơ bản của
            một thương hiệu lớn. Trong đó, thiết kế bao bì đóng vai trò thu hút
            sự chú ý của khách hàng, không chỉ với sản phẩm mà còn cả doanh
            nghiệp sở hữu từ kiểu chữ, hình ảnh…
          </p>
          <div className="max-w-[600px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={60 / 36}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Thiết kế bao bì đẹp sẽ thu hút được khách hàng"
                  src={"/thiet-ke-bao-bi-my-pham-2.jpg"}
                  fill
                  sizes="(min-width: 700px) 600px, calc(95.79vw - 51px)"
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Thiết kế bao bì đẹp sẽ thu hút được khách hàng
              </p>
            </div>
          </div>

          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Đưa thông điệp của mỹ phẩm đến khách hàng
          </h3>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Thiết kế bao bì phải gửi một thông điệp rõ ràng về sản phẩm được
            cung cấp và kết nối với đối tượng mục tiêu của doanh nghiệp. Thông
            tin phải được truy cập nhanh chóng và dễ hiểu trong nháy mắt.
          </p>
          <h3 className="text-lg text-blue-400 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Tạo ấn tượng tốt
          </h3>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Một thiết kế bao bì chất lượng có thể thu hút khách hàng tiềm năng
            và tạo sự khác biệt cho sản phẩm so với các đối thủ cạnh tranh. Sự
            hiện diện trực quan không chỉ thể hiện chất lượng của sản phẩm mà
            còn phải gợi ý một cá tính rõ ràng – cho dù là kỳ quặc, chân thực
            hay quyến rũ.
          </p>
          <h2 className="text-xl text-red-500 font-bold mb-3 [&:not(:first-child)]:mt-6">
            Doanh nghiệp nên tự thiết kế hay thuê dịch vụ thiết kế bao bì mỹ
            phẩm
          </h2>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Hầu hết các doanh nghiệp hiện nay đều có bộ phận thiết kế riêng, tuy
            nhiên không phải ai cũng biết cách tạo nên linh hồn cho sản phẩm
            thông qua thiết kế bao bì. Đây cũng là lý do đưa dịch vụ thiết kế mỹ
            phẩm chuyên nghiệp ngày càng phổ biến và phát triển nhanh chóng trên
            thị trường.
          </p>

          <div className="max-w-[600px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={6 / 4}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Doanh nghiệp cần đầu tư vào bao bì sản phẩm"
                  src={"/thiet-ke-bao-bi-my-pham-3.jpg"}
                  fill
                  sizes="(min-width: 700px) 600px, calc(95.79vw - 51px)"
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Doanh nghiệp cần đầu tư vào bao bì sản phẩm
              </p>
            </div>
          </div>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Trong đó, I.C.H là một trong những đơn vị thiết kế & gia công mỹ
            phẩm chất lượng được rất nhiều khách hàng lớn nhỏ tin tưởng hợp tác,
            và đây là lý do tại sao:
          </p>
          <ul className="text-base font-light text-black-100 mb-3 list-disc ml-5 space-y-2">
            <li>Cập nhật xu hướng và thị hiếu của khách hàng nhanh chóng.</li>
            <li>
              Người thiết kế không chỉ giỏi về chuyên môn mà còn giàu kinh
              nghiệm trong lĩnh vực thiết kế bao bì.
            </li>
            <li>Quy trình thực hiện rõ ràng.</li>
            <li>
              Trao đổi với khách hàng về mong muốn, phân khúc sản phẩm và các
              định hướng khác trước khi tiến hàng phác thảo.
            </li>
            <li>
              Chỉnh sửa kịp thời theo yêu cầu và ý kiến khách hàng nếu họ chưa
              hài lòng.
            </li>
          </ul>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Ngoài ra, nhiều đơn vị hợp tác vì I.C.H còn có chính sách ưu đãi cực
            hấp dẫn dành cho khách hàng mới lẫn khách hàng cũ, điển hình là:
          </p>
          <ul className="text-base font-light text-black-100 mb-3 list-disc ml-5 space-y-2">
            <li>
              Chi phí dịch vụ phải chăng và có chiết khấu tốt nếu hợp tác trong
              nhiều hạng mục khác như gia công mỹ phẩm, hỗ trợ thủ tục công bố
              mỹ phẩm,…
            </li>
            <li>
              Tư vấn ý tưởng, cách thực hiện và các chiến lược cần thiết để sản
              phẩm tiếp cận thị trường tốt, mang lại doanh thu cao.
            </li>
            <li>
              Tiết kiệm chi phí in ấn, thiết kế và thử nghiệm mẫu trước khi gia
              công hàng loạt.
            </li>
            <li>
              Tư vấn thiết kế và lựa chọn chất liệu phù hợp với từng sản phẩm
              khác nhau.
            </li>
            <li>
              Đăng ký bảo hộ thương hiệu cho khách hàng gia công tại I.C.H với
              chi phí ưu đãi.
            </li>
          </ul>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Thiết kế bao bì mỹ phẩm là một quá trình nghiên cứu dài lâu, các
            thông điệp từ hình ảnh đến phân bố chữ đều phải mang lại lợi ích cho
            khách hàng.
          </p>
          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Thay vì mất thêm một bước tra cứu, khách hàng có thể hiểu ngay sản
            phẩm đang cầm trên tay có có những công dụng nào, nhờ vậy, doanh
            nghiệp có thể bán được một sản phẩm ngay mà không mất thời gian quá
            nhiều để tư vấn.
          </p>

          <p className="text-base font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Đến với I.C.H doanh nghiệp sẽ đạt ngay những điều này vì đã có đội
            ngũ dày dặn kinh nghiệm giúp bạn tìm hiểu về nhu cầu của khách hàng.
          </p>
          <p className="text-xl font-light text-black-100 mb-3 mt-32 ">
            <strong className="font-bold">{constants.company}</strong>
          </p>
          <p className="text-sm font-light text-black-100 mb-3">
            Văn phòng & Nhà máy: {constants.addressCompany}
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Hotline: {constants.phoneNumberCompany}
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Email: {constants.emailCompany}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PackageingDesign;
