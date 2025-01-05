import { Poppins } from "next/font/google";
import { Spectral } from "next/font/google";
import '../../globalsLanding.css'

const poppins = Poppins({
    weight: ['300', '400', '500', '700', '800'],
    subsets: ['latin-ext']
});

const spectral = Spectral({
    weight: ['400', '700'],
    subsets: ['latin']
});

export default function AuthRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="eng">
            <body className={poppins.className}>
                {children}
            </body>
        </html>
    )
}
