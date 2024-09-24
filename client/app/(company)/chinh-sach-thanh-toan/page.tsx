import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
const PaymentPolicy = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto pt-[30px] pb-[60px]">
        <div className="mx-5 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold sm:mb-6 mb-3 text-blue-400">
            CHÍNH SÁCH THANH TOÁN
          </h1>
          <div className="max-w-[800px] w-full mx-auto">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={96 / 50}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Nhà Máy Sản Xuất Mỹ Phảm I.C.H"
                  src={"/other/payment.jpeg"}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Chính sách thanh toán tại I.C.H
              </p>
            </div>
          </div>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Nhằm giúp khách hàng thuận tiện hơn trong việc thanh toán hợp đồng.
            I.C.H gửi đến khách hàng 2 phương thức thanh toán chính:
          </p>

          <ul className="text-base font-light text-black-100 list-disc ml-5 space-y-2 [&:not(:first-child)]:mt-6">
            <li>
              Thanh toán bằng <strong className="font-bold">tiền mặt.</strong>
            </li>
            <li>
              Thanh toán <strong className="font-bold">chuyển khoản</strong>{" "}
              ngân hàng đến số tài khoản:
            </li>
          </ul>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Công ty TNHH MTV TM Sản Xuất I.C.H –{" "}
            <strong className="font-bold">
              0321 000 623209 ( Vietcombank )
            </strong>
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Cá nhân – Giám đốc – anh Lê Minh Đức:{" "}
            <strong className="font-bold">
              0321 000 623209 ( Vietcombank )
            </strong>
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Quý khách hàng vui lòng{" "}
            <strong className="font-bold">
              thanh toán 100% hoặc trả trước 30% giá trị đơn hàng
            </strong>{" "}
            và thanh toán phần còn lại khi nhận hàng. Sản phẩm sẽ được sản xuất,
            đóng gói và vận chuyển đến khách hàng cách nhanh chóng nhất.
          </p>
          <p className="text-base font-light text-black-100 mb-3">
            Toàn bộ chính sách thanh toán sẽ được thỏa thuận và quy định rõ ràng
            với quý khách trong hợp đồng. I.C.H{" "}
            <strong className="font-bold">cam kết</strong> kinh doanh uy tín,
            minh bạch với các sản phẩm chất lượng nhất.
          </p>
          <p className="text-xl font-light text-black-100 mb-3 mt-32">
            <strong className="font-bold">
              CÔNG TY TNHH MTV TM SẢN XUẤT I.C.H
            </strong>
          </p>
          <p className="text-sm font-light text-black-100 mb-3">
            Văn phòng & Nhà máy: 159 Nguyễn Đình Chiễu, Khóm 3, Phường 4, Sóc
            Trăng.
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Hotline: 0707.000.004
          </p>
          <p className="text-sm font-light text-black-100 mb-3 truncate">
            Email: ichcosmetic@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentPolicy;
