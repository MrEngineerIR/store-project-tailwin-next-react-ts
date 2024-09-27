import Dashboard from "@/components/dashboard/Dashboard";
import Information from "@/components/dashboard/statics/Information";
import Orders from "@/components/dashboard/orders/Orders";
import PrivateMessageList from "@/components/dashboard/private_messages/PrivateMessageList";
const page = () => {
  return (
    <Dashboard order={<Orders />} privateMessage={<PrivateMessageList />}>
      <Information />
    </Dashboard>
  );
};

export default page;
