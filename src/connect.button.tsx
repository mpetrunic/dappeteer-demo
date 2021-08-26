import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

export default function ConnectButton() {
    const {activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);
  
    function handleConnectWallet() {
      activateBrowserWallet();
    }
  
    return account ? (
      <Box>
        <Text className="balance" id="balance" color="white" fontSize="md">
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
    ) : (
      <Button className="connectBtn" onClick={handleConnectWallet}>
        Connect to a wallet
      </Button>
    );
  }