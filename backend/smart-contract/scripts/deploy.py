from brownie import nftMinter, accounts


def main():

    account = accounts.load('dev1')
    contract = nftMinter.deploy({"from": account}, publish_source=False)

    print(f"Your contract deployed at address: {contract}")

    #0x4F514161018BE7B438b282e5cFc42CbFD66D8971