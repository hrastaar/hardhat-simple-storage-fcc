import {ethers, run} from "hardhat";

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying SimpleStorage contract...");

    const simpleStorage = await simpleStorageFactory.deploy();
    const simpleStorageAddress = await simpleStorage.getAddress();

    console.log(`Deployed SimpleStorage contract to: ${simpleStorageAddress}`);

    // wait for 6 confirmations
    await simpleStorage.deploymentTransaction()?.wait(6);

    // verify contract code with etherscan
    await verify(simpleStorageAddress, []);

    const firstStorageValue = await simpleStorage.retrieve();

    console.log(`First value from contract: ${firstStorageValue}`);

    const updateFavNumberTransaction = await simpleStorage.store(7);
    await updateFavNumberTransaction.wait(1);

    const updatedValue = await simpleStorage.retrieve();
    
    console.log(`Updated value to: ${updatedValue}`)
}

// helper function verify contract code with etherscan
async function verify(contractAddress: string, args: any[]) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,            
        })
    } catch (e: any) {
        console.log(e);
    }
    
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });