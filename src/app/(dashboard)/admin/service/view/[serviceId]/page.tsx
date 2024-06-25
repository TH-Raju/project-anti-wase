
import ServiceView from "@/components/service/viewService";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceCreate",
  description: "ServiceCreate",
};
const ViewServicePage = ({ params }: { params: { serviceId: string } }) => {

  return (
    <>

      <ServiceView serviceId={params.serviceId} />
    </>
  );
};

export default ViewServicePage;
