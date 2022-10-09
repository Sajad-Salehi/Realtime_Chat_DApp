from brownie import nftMinter, accounts


def main():

    account = accounts.load('dev1')
    contract = nftMinter.deploy({"from": account}, publish_source=False)

    print(f"Your contract deployed at address: {contract}")

    #0x6a2c8C358F2C55cd68AC263f77565C0ad7036625