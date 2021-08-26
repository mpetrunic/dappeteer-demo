import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./layout";
import ConnectButton from "./connect.button";

export default function App() {
  return (
    <ChakraProvider>
      <Layout>
        <ConnectButton />
      </Layout>
    </ChakraProvider>
  )
}