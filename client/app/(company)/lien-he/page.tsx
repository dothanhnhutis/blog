import { FaPhoneFlip } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { ContactForm } from "../contact-form";
import configs from "@/config";
import constants from "@/constants";

const Contact = () => {
  return (
    <section className="bg-muted/40">
      <GoogleMapsEmbed
        apiKey={configs.NEXT_PUBLIC_GOOGLE_MAP_KEY!}
        height={500}
        width="100%"
        zoom="17"
        mode="place"
        center="9.602798009613883,105.98229552613205"
        q="Nhà Máy Sản Xuất Mỹ Phẩm I.C.H+Sóc+Trăng,Việt+Nam"
      />

      <div className="grid md:grid-flow-col md:grid-cols-2 gap-5 max-w-7xl mx-auto pt-[30px] pb-[60px] px-5">
        <div className="shadow-md rounded p-6 bg-background">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 text-primary">
            LIÊN HỆ GIA CÔNG VỚI I.C.H
          </h2>
          <p className="sm:text-base font-light text-sm mb-3">
            Quý khách có nhu cầu tư vấn gia công sản xuất mỹ phẩm, sản phẩm chăm
            sóc gia đình, hãy gửi yêu cầu cho I.C.H theo thông tin hỗ trợ dưới
            đây. Đội ngũ CSKH sẽ liên hệ lại ngay để hỗ trợ cho Quý khách.
          </p>

          <p className="text-base font-light mb-3">
            <strong className="font-bold">Tư Vấn Chuyên Môn</strong>
          </p>
          <Link
            href={`tel:${constants.phoneNumberCompany}`}
            className="inline-block border-primary border rounded-full p-3 text-primary mb-3"
          >
            <FaPhoneFlip className="inline-block" size={16} /> Gọi Ngay
          </Link>
          <p className="text-base font-light mb-3">
            <strong className="font-bold">Yêu Cầu Báo Giá</strong>
          </p>
          <p className="text-base font-light mb-3 text-primary">
            <MdMail className="inline-block" size={16} />{" "}
            {constants.emailCompany}
          </p>
          <p className="text-base font-light mb-3">
            <strong className="font-bold">Tư Vấn Gia Công</strong>
          </p>
          <p className="text-base font-light mb-3">
            <FaPhoneFlip className="inline-block" size={16} /> Thuỳ Lâm:{" "}
            <Link
              target="_blank"
              href={constants.social.zalo}
              className="text-red-500 font-bold"
            >
              0906.64.04.64
            </Link>
            (Hotline/Zalo)
          </p>
          <p className="text-base font-light text-black-100 mb-3">
            Kết nối Zalo để được tư vấn:{" "}
            <Link
              target="_blank"
              href={constants.social.zalo}
              className="font-bold"
            >
              {constants.social.zalo}
            </Link>
          </p>
          <p className="text-base font-light text-black-100 mb-3">
            <strong className="font-bold">VP đại diện: </strong>159 Nguyễn Đình
            Chiễu, Khóm 3, Phường 4, Sóc Trăng.
          </p>
          <p className="text-base font-light text-black-100 mb-3">
            <strong className="font-bold">Thời gian làm việc: </strong> 7h30 –
            17h00 (Thứ 2 – Thứ 7)
          </p>
        </div>
        <div className="bg-background shadow-md rounded p-6 ">
          <h2 className="font-bold text-lg sm:text-xl md:text-2xl text-primary mb-3 ">
            LIÊN HỆ
          </h2>
          <p className="sm:text-base font-light text-sm mb-3">
            Bạn đang muốn làm chủ một thương hiệu riêng mình. Vui lòng để lại
            thông tin để được liên hệ tư vấn.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
