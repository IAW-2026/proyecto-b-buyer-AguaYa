type VendorPageProps = {
  params: Promise<{ vendor_id: string }>;
};

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendor_id } = await params;
  return (
    <div>
      <h1>Vendor ID: {vendor_id}</h1>
    </div>
  );
}