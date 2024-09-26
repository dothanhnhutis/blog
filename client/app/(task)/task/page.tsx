"use client";
import { Logo } from "@/components/logo";
import { useTask } from "@/components/providers/task-provider";
import {
  BadgeAlertIcon,
  BadgeCheckIcon,
  BadgeHelpIcon,
  BadgeInfoIcon,
  EllipsisIcon,
  FlameIcon,
} from "lucide-react";
import React from "react";

const TastPage = () => {
  const { connected, tasks } = useTask();

  return (
    <div>
      <div className="sticky top-0 left-0 right-0 flex items-center gap-2 p-3 bg-white border-b">
        <Logo className="rounded-full overflow-hidden shadow" />
        <div className="flex items-center justify-between w-full">
          <div>
            <p>Phòng Khóm</p>
            {connected ? (
              <div className="flex gap-1 items-center">
                <div className="size-2 rounded-full shrink-0 bg-green-400"></div>
                <p className="text-sm">connected</p>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <div className="size-2 rounded-full shrink-0 bg-red-400"></div>
                <p className="text-sm">disconnected</p>
              </div>
            )}
          </div>
          <EllipsisIcon className="shrink-0 size-5" />
        </div>
      </div>

      <div className="grid gap-3 p-2">
        <div className="rounded-lg bg-green-200/50 p-3">
          <div className="flex gap-2">
            <BadgeCheckIcon className="size-10 shrink-0 text-green-600" />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold w-full ">Ten Cong viec</h3>
                <p className="text-sm font-medium text-nowrap ">
                  24/09/2024 11:17
                </p>
              </div>

              <p className="text-base font-medium ">
                Sử dụng Chromecast hoặc thiết bị tương tự: Bạn có thể sử dụng
                Google Chromecast hoặc thiết bị phát nội dung tương tự để truyền
                nội dung từ máy tính lên TV qua mạng Wi-Fi.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <div className="size-3 rounded-full shrink-0 bg-green-500"></div>
            <p>Hoàn Thành</p>
            <p>24/09/24 11:17 - 24/09/24 11:17 </p>
          </div>
        </div>
        <div className="flex gap-2 rounded-lg bg-red-200/50 p-3 ">
          <BadgeAlertIcon className="size-10 shrink-0 text-red-600" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold w-full ">Ten Cong viec</h3>
              <p className="text-sm font-medium text-nowrap ">
                24/09/2024 11:17
              </p>
            </div>

            <p className="text-base font-medium">
              Sử dụng Chromecast hoặc thiết bị tương tự: Bạn có thể sử dụng
              Google Chromecast hoặc thiết bị phát nội dung tương tự để truyền
              nội dung từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast
              hoặc thiết bị tương tự: Bạn có thể sử dụng Google Chromecast hoặc
              thiết bị phát nội dung tương tự để truyền nội dung từ máy tính lên
              TV qua mạng Wi-Fi. Sử dụng Chromecast hoặc thiết bị tương tự: Bạn
              có thể sử dụng Google Chromecast hoặc thiết bị phát nội dung tương
              tự để truyền nội dung từ máy tính lên TV qua mạng Wi-Fi. Sử dụng
              Chromecast hoặc thiết bị tương tự: Bạn có thể sử dụng Google
              Chromecast hoặc thiết bị phát nội dung tương tự để truyền nội dung
              từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast hoặc thiết
              bị tương tự: Bạn có thể sử dụng Google Chromecast hoặc thiết bị
              phát nội dung tương tự để truyền nội dung từ máy tính lên TV qua
              mạng Wi-Fi. Sử dụng Chromecast hoặc thiết bị tương tự: Bạn có thể
              sử dụng Google Chromecast hoặc thiết bị phát nội dung tương tự để
              truyền nội dung từ máy tính lên TV qua mạng Wi-Fi.
            </p>
            <div className="flex items-center justify-end gap-2">
              <div className="size-3 rounded-full shrink-0 bg-red-500"></div>
              <p>Làm liền</p>
              <p className="">24/09/24 11:17 - 24/09/24 11:17 </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 rounded-lg bg-orange-200/50 p-3 ">
          <BadgeAlertIcon className="size-10 shrink-0 text-orange-600" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold w-full ">Ten Cong viec</h3>
              <p className="text-sm font-medium text-nowrap ">
                24/09/2024 11:17
              </p>
            </div>

            <p className="text-base font-medium">
              Chromecast hoặc thiết bị phát nội dung tương tự để truyền nội dung
              từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast hoặc thiết
              bị tương tự: Bạn có thể sử dụng Google Chromecast hoặc thiết bị
              phát nội dung tương tự để truyền nội dung từ máy tính lên TV qua
              mạng Wi-Fi. Sử dụng Chromecast hoặc thiết bị tương tự: Bạn có thể
              sử dụng Google Chromecast hoặc thiết bị phát nội dung tương tự để
              truyền nội dung từ máy tính lên TV qua mạng Wi-Fi.
            </p>
            <div className="flex items-center justify-end gap-2">
              <div className="size-3 rounded-full shrink-0 bg-orange-500"></div>
              <p>Hoàn Thành</p>
              <p className="">24/09/24 11:17 - 24/09/24 11:17 </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 rounded-lg bg-sky-200/50 p-3 ">
          <BadgeInfoIcon className="size-10 shrink-0 text-sky-600" />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold w-full ">Ten Cong viec</h3>
              <p className="text-sm font-medium text-nowrap ">
                24/09/2024 11:17
              </p>
            </div>
            <ul className="list-disc [&>li]:mt-2">
              <li className="text-base font-medium">
                Chromecast hoặc thiết bị phát nội dung tương tự để truyền nội
                dung từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast hoặc
                thiết Chromecast hoặc thiết bị phát nội dung tương tự để truyền
                nội dung từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast
                hoặc thiết
              </li>
              <li className="text-base font-medium">
                Chromecast hoặc thiết bị phát nội dung tương tự để truyền nội
                dung từ máy tính lên TV qua mạng Wi-Fi. Sử dụng Chromecast hoặc
                thiết
              </li>
            </ul>

            <div className="flex items-center justify-end gap-2">
              <div className="size-3 rounded-full shrink-0 bg-sky-500"></div>
              <p>Dự Trữ</p>
              <p className="">24/09/24 11:17 - 24/09/24 11:17 </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TastPage;
