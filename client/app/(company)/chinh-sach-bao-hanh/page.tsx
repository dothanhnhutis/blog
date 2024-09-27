import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import constants from "@/constants";

const WarrantyPolicy = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto pt-[30px] pb-[60px]">
        <div className="mx-5 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold mb-6 text-blue-400">
            CHÍNH SÁCH BẢO HÀNH
          </h1>
          <h2 className="text-xl text-red-500 font-bold [&:not(:first-child)]:mt-6">
            Tổng quan về I.C.H
          </h2>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Chính sách bảo hành sẽ được I.C.H thực hiện khi sản phẩm thuộc các
            điều khoản dưới đây:
          </p>
          <ul className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6 list-disc ml-5 space-y-2">
            <li>
              Tất cả các sản phẩm của I.C.H còn trong thời hạn bảo hành đều được
              bảo hành hoàn toàn miễn phí. Thời hạn bảo hành được xác định là
              thời gian sống của sản phẩm và được nêu rõ trong hợp đồng.
            </li>
            <li>
              Sản phẩm bảo hành phải nguyên chai, nguyên gói, không có dấu hiệu
              đã qua sử dụng hay rách, móp.
            </li>
            <li>
              Những sản phẩm hư hỏng được xác định do lỗi của nhà sản xuất (lỗi
              kỹ thuật) ngoại trừ lỗi của bên mua (Điều kiện bảo quản…)
            </li>
            <li>
              Tất cả Nguyên liệu – Bao bì – Chai Lọ – In ấn được I.C.H cung cấp
              toàn bộ.
            </li>
          </ul>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            <strong className="font-bold italic underline">Lưu ý:</strong> Những
            sản phẩm đổi trả hàng không đáp ứng các điều kiện nêu trên sẽ được
            tự động chuyển hoàn về lại người yêu cầu.
          </p>
          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={1024 / 427}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Nhà Máy Sản Xuất Mỹ Phảm I.C.H"
                  src={"/other/warranty.jpg"}
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
            Phương thức bảo hành
          </h2>
          <ul className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6 list-disc ml-5 space-y-2">
            <li>
              Tất cả các sản phẩm sẽ được đổi trả miễn phí trong vòng 30 ngày kể
              từ ngày cung cấp.
            </li>
            <li>
              Trong trường hợp không có hàng mới để đổi thì sẽ thỏa thuận đổi
              sang hàng mới khác có giá trị tương đương hoặc sẽ hoàn trả lại
              đúng số tiền mà quý khách đã mua.
            </li>
          </ul>
          <h2 className="text-xl text-red-500 font-bold [&:not(:first-child)]:mt-6">
            Trường hợp không áp dụng chính sách bảo hành
          </h2>
          <ul className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6 list-disc ml-5 space-y-2">
            <li>
              Những trường hợp không thuộc điều kiện bảo hành trên sẽ được
              chuyển hoàn về cho đơn vị yêu cầu áp dụng chính sách bảo hành.
            </li>
            <li>Sản phẩm không thuộc dược mỹ phẩm I.C.H sản xuất.</li>
            <li>Khách hàng bảo quản sản phẩm sai quy định.</li>
          </ul>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            Chính sách bảo hành trên sẽ được I.C.H cung cấp cách rõ ràng, chi
            tiết nhất khi tiến hành trao đổi trực tiếp với khách hàng và được
            thỏa thuận rõ khi ký hợp đồng.
          </p>
          <p className="text-base font-light text-black-100 [&:not(:first-child)]:mt-6">
            <strong className="font-bold italic">
              Ngoài ra, nếu có bất kỳ thắc mắc nào quý khách vui lòng liên hệ
              trực tiếp đến hotline 0904.640.464
            </strong>
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

export default WarrantyPolicy;
