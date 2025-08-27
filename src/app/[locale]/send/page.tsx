import Header from "@/components/Header";
import Form from "./Form";

const Send = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header page="/send" />
      <Form />
    </div>
  );
};

export default Send;
