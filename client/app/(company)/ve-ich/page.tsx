import Image from "next/image";
import { YouTubeEmbed } from "@next/third-parties/google";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import configs from "@/config";
import { Metadata } from "next";
import { baseOpenGraph } from "@/app/shared-metadata";
import constants from "@/constants";

export async function generateMetadata(): Promise<Metadata> {
  const url = configs.NEXT_PUBLIC_CLIENT_URL + "/ve-ich";
  return {
    title: "Về ICH",
    description:
      "Công ty Mỹ phẩm ICH là công ty chuyên sản xuất, gia công mỹ phẩm được chuyển giao công nghệ, các thành tựu nghiên cứu và nguồn nguyên liệu độc quyền.",
    alternates: {
      canonical: url,
    },
    keywords: [
      "sản xuất",
      "gia công",
      "gia công mỹ phẩm",
      "sản xuất mỹ phẩm",
      "ich",
      "i.c.h",
    ],
    openGraph: {
      ...baseOpenGraph,
      title: "Về ICH",
      description:
        "Công ty Mỹ phẩm ICH là công ty chuyên sản xuất, gia công mỹ phẩm được chuyển giao công nghệ, các thành tựu nghiên cứu và nguồn nguyên liệu độc quyền.",
      url,
      siteName: "Công ty TNHH MTV TM Sản Xuất I.C.H",
      images: [
        {
          url: configs.NEXT_PUBLIC_COMPANY_IMAGE_URL,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      ...baseOpenGraph,
      title: "Về ICH",
      description:
        "Công ty Mỹ phẩm ICH là công ty chuyên sản xuất, gia công mỹ phẩm được chuyển giao công nghệ, các thành tựu nghiên cứu và nguồn nguyên liệu độc quyền.",
      images: [
        {
          url: configs.NEXT_PUBLIC_COMPANY_IMAGE_URL,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const About = () => {
  return (
    <section className="bg-muted/40">
      <div className="max-w-7xl mx-auto py-2 sm:pt-[30px] sm:pb-[60px]">
        <div className="sm:mx-5 mx-2 px-3 pt-5 pb-8 shadow rounded bg-background">
          <h1 className="block text-center text-xl sm:text-2xl font-bold sm:mb-6 mb-3 text-blue-400">
            I.C.H - KHÔNG NGỪNG CẢI TIẾN, KHÔNG NGỪNG VƯƠN XA
          </h1>
          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            ICH là nhà máy gia công sản xuất mỹ phẩm và phát triển sản phẩm theo
            phương thức OEM/ ODM và chất lượng theo tiêu chuẩn C-GMP của Bộ Y
            Tế. Với sứ mệnh tạo điều kiện thuận lợi cho các doanh nghiệp mỹ phẩm
            tại Việt Nam sở hữu sản phẩm chất lượng và độc quyền trên thị trường
            với chi phí tối thiểu nhất.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Giấy chứng nhận đủ điều kiện sản xuất"
                  src="/documents/giay-chung-nhan-du-dieu-kien-sx.png"
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2 ">
                Giấy chứng nhận đủ điều kiện sản xuất
              </p>
            </div>
          </div>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            Sở hữu dịch vụ tư vấn và thực hiện trọn gói theo nhu cầu của từng
            khách hàng từ công thức, bảng thành phần tối ưu, chiết xuất cao cấp,
            bao bì và báo giá ưu đãi theo số lượng đặt hàng.
          </p>

          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Nhà Máy Sản Xuất Mỹ Phảm I.C.H"
                  src={"/company.jpg"}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Nhà Máy Sản Xuất Mỹ Phảm I.C.H
              </p>
            </div>
          </div>

          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            ICH hoạt động với phương châm luôn không ngừng cải tiến, đổi mới,
            nâng cao chất lượng sản phẩm từ quá trình lựa chọn nguyên liệu, sản
            xuất và kiểm tra chất lượng nghiêm ngặt trước khi đưa sản phẩm ra
            thị trường.
          </p>
          <div className="max-w-[800px] w-full mx-auto [&:not(:first-child)]:mt-6">
            <div className="flex flex-col items-center justify-center bg-gray-50/70">
              <AspectRatio ratio={4 / 3}>
                <Image
                  className="inline-block align-middle max-w-full"
                  alt="Máy chiết rót tự động"
                  src={"/manufacture/chiet-rot.jpg"}
                  sizes="(min-width: 900px) 800px, calc(93.1vw - 19px)"
                  fill
                />
              </AspectRatio>
              <p className="italic text-center text-xs sm:text-sm p-2">
                Máy chiết rót tự động
              </p>
            </div>
          </div>
          <p className="sm:text-base text-sm font-light text-black-100 mb-3 [&:not(:first-child)]:mt-6">
            ICH rất vinh hạnh được trở thành đối tác đồng hành cùng Quý doanh
            nghiệp trong hành trình tạo ra các sản phẩm làm đẹp chất lượng và uy
            tín trên thị trường.
          </p>

          <div className="flex items-center justify-center sm:mb-8 mb-4">
            <YouTubeEmbed
              playlabel="Nhà Máy Gia Công Mỹ Phẩm I.C.H"
              videoid="Ej7OAuVAAIM"
              params="controls=1&loop=0"
            />
          </div>

          <div className="max-w-[720px] max-h-[405px] w-full mx-auto mb-10">
            <YouTubeEmbed
              playlabel="Nhà Máy Gia Công Mỹ Phẩm I.C.H"
              videoid="Ej7OAuVAAIM"
              params="controls=1&loop=0"
            />
          </div>

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

export default About;
