import './globals.css'

export const metadata = {
  title: 'Local Partnership Pitch Kit | Get Local Businesses to Promote Your Business',
  description: 'The complete toolkit for securing partnerships with cafes, gyms, salons, offices, and event hosts. Templates, scripts, and tracking sheets included.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}