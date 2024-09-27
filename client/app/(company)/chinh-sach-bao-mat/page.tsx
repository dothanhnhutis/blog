import { AspectRatio } from "@/components/ui/aspect-ratio";
import constants from "@/constants";
import Image from "next/image";
const PrivacyPolicy = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto pt-[30px] pb-[60px]">
        <div className="mx-5 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold text-blue-400">
            CHÍNH SÁCH BẢO MẬT
          </h1>
          <h2 className="text-xl text-red-500 font-bold [&:not(:first-child)]:mt-6">
            Mục đích và phạm vi I.C.H thu thập thông tin
          </h2>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Các thông tin cá nhân mà I.C.H thu thập trên website chính thức của
            công ty bao gồm họ và tên, số điện thoại, email, địa chỉ có thể liên
            hệ đến khách hàng. Các thông tin này được
            <strong className="font-bold">
              {" "}
              I.C.H “cam kết” bảo mật, không tiết lộ cho bên thứ ba nhằm mục
              đích mua bán, trao đổi để trục lợi cá nhân.
            </strong>
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Thông qua quá trình thu thập thông tin nhằm giúp I.C.H:
          </p>
          <ul className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6 list-disc ml-5 space-y-2">
            <li>Thúc đẩy quá trình mua hàng của khách hàng nhanh chóng hơn.</li>
            <li>
              Hỗ trợ lắng nghe, giải đáp tường tận các thắc mắc của khách hàng.
            </li>
            <li>Cập nhật các dịch vụ, ưu đãi hấp dẫn từ I.C.H.</li>
            <li>
              Nâng cấp, hoàn thiện website mỗi ngày từ các feedback của khách
              hàng.
            </li>
            <li>
              Thực hiện chương trình marketing các dịch vụ, sản phẩm do I.C.H
              cung cấp.
            </li>
            <li>
              Liên hệ nhanh nhất đến khách hàng trong những trường hợp đặc biệt
              như thay đổi đơn hàng, yêu cầu điều tra từ cơ quan pháp luật…
            </li>
          </ul>
          <h2 className="text-xl text-red-500 font-bold [&:not(:first-child)]:mt-6">
            Cách I.C.H sử dụng thông tin khách hàng
          </h2>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Chính sách bảo mật thông tin khách hàng sẽ được I.C.H sử dụng có tổ
            chức và đảm bảo an toàn cách tốt nhất.
          </p>
          <h3 className="text-lg text-blue-400 font-bold [&:not(:first-child)]:mt-6">
            Phạm vi sử dụng
          </h3>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            I.C.H sẽ sử dụng thông tin khách hàng theo đúng “chính sách bảo mật”
            được đặt ra và chỉ có thành viên ban quản trị mới có thể truy cập
            các thông tin này.
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Tất cả dữ liệu khách hàng sẽ không được cung cấp cho bên thứ ba nếu
            không có sự đồng ý từ quý khách hoặc cơ quan pháp luật yêu cầu.
          </p>
          <h3 className="text-lg text-blue-400 font-bold [&:not(:first-child)]:mt-6">
            Thời gian lưu trữ thông tin
          </h3>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Khi có yêu cầu từ ban quản trị dược mỹ phẩm I.C.H thì các thông tin
            từ khách hàng mới được thực hiện hủy bỏ. Ngoài ra, các dữ liệu đều
            sẽ được áp dụng chính sách bảo mật trên hệ thống máy chủ
            ichvietnam.vn
          </p>
          <h3 className="text-lg text-blue-400 font-bold [&:not(:first-child)]:mt-6">
            Địa chỉ đơn vị quản trị thông tin
          </h3>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            {constants.company}
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Địa chỉ: {constants.addressCompany}
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Hotline: {constants.phoneNumberCompany}
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Email: {constants.emailCompany}
          </p>
          <h3 className="text-lg text-blue-400 font-bold [&:not(:first-child)]:mt-6">
            I.C.H sử dụng cookie
          </h3>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Cookie là các tệp được tạo ra khi người dùng truy cập vào một trang
            web nào đó mà không gây virus trên máy tính. Cookie giúp người dùng
            truy cập dễ dàng hơn khi ghé đến website dù một hay nhiều lần trong
            các thời điểm khác nhau.
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Nhằm giúp khách hàng tăng trải nghiệm khi ghé thăm trang web của
            mình, I.C.H sẽ sử dụng cookie. Đồng thời, các thông tin về số lần
            truy cập, số link đã xem, thời gian truy cập, ngôn ngữ sử dụng, địa
            chỉ IP, một số địa chỉ khác được truy xuất từ quý khách sẽ được lưu
            lại tự động.
          </p>
          <h3 className="text-lg text-blue-400 font-bold [&:not(:first-child)]:mt-6">
            Việc thay đổi chính sách
          </h3>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Để có thể hoàn thiện mỗi ngày từ những góp ý của khách hàng và phù
            hợp với mong muốn của I.C.H, chính sách bảo mật có thể được thay đổi
            mà không thông báo đến quý khách hàng.
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Mọi thông tin liên quan đến khách hàng từ các trang web khác không
            phải strong <strong className="font-bold">ichvietnam.vn</strong> đều
            nằm ngoài nội dung bảo mật của I.C.H.
          </p>
          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={77 / 55}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Nhà Máy Sản Xuất Mỹ Phảm I.C.H"
                  src={"/other/privacy.jpeg"}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Chính sách bảo hành tại I.C.H
              </p>
            </div>
          </div>

          <h2 className="text-xl text-red-500 font-bold [&:not(:first-child)]:mt-6">
            Khách hàng có thể thay đổi thông tin tại đâu?
          </h2>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Trong quá trình hợp tác, tìm hiểu nếu có bất kỳ sai sót nào liên
            quan đến thông tin đăng ký, quý khách vui lòng liên hệ đến số
            hotline hoặc email của công ty. I.C.H luôn sẵn sàng lắng nghe, hỗ
            trợ khách hàng .
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Bên cạnh đó, quý khách hàng vui lòng cung cấp
            <strong className="font-bold"> ĐẦY ĐỦ</strong> và xác nhận
            <strong className="font-bold"> CHÍNH XÁC</strong> các thông tin đăng
            ký được yêu cầu. Khách hàng sẽ chịu trách nhiệm pháp lý đối với tất
            cả các thông tin đã cung cấp cho I.C.H.
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Thêm vào đó, I.C.H sẽ xuất trình dữ liệu khách hàng khi có yêu cầu
            nào từ phía cơ quan có thẩm quyền nhưng vẫn phối hợp bảo mật thông
            tin tốt nhất có thể.
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

export default PrivacyPolicy;
