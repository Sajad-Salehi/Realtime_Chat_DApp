from brownie import nftMinter, accounts


def main():

    account = accounts.load('dev1')
    contract = nftMinter.deploy({"from": account}, publish_source=False)

    print(f"Your contract deployed at address: {contract}")

    