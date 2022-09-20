from brownie import nftMinter, accounts


def main():

    account = accounts.load('dev1')
    contract = nftMinter.deploy({"from": account}, publish_source=False)

    print(f"Your contract deployed at address: {contract}")

    #0x2b72578a895D5b82D9D8b81E63125D341EFD9Cd4