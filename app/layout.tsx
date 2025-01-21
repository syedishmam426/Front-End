import type { Metadata } from "next";
import Image from "next/image";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple full-stack Todo list application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-[#0D0D0D] text-white flex items-center justify-center h-[12vh] min-h-[120px] md:h-[15vh] md:min-h-[150px] lg:h-[18vh] lg:min-h-[180px] xl:h-[200px]">
          <div className="max-w-3xl mx-auto flex justify-center gap-3">
            <Image src="/rocket.svg" alt="Rocket Logo" width={22} height={36} />
            <Image src="/ToDoApp.png" alt="ToDo App Logo" width={192} height={48} />
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-3xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
