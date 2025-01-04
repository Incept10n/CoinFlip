<h1 align="center">Ton Coinflip</h1>

https://github.com/user-attachments/assets/dfe13498-7d82-4797-b1c7-bb2c7e3086d1

The app is available here: https://cryptoroll-coinflip.vercel.app/

<h3>Motivation behind this app</h3>

This is a part of the Cryptoroll project.

> <p>The mission is to build the fully decentralized gambling platform on the TON blockchain. <br>
> Being a decentralized platform, the game is accessible to anyone with an internet connection and a TON wallet, <br>
> ensuring a global player base without restrictions imposed by traditional gambling regulations.</p>

### This app
* has responsive design for all devices
* uses decentralized backend (TON smart contracts)
* uses [toncenter](https://toncenter.com/) API

### Remarks

<p>
  This is a decentralized app which means it can NEVER be down <br>
  If this frontend server is down, feel free to use this code to run frontend on your machine
</p>

#### How to run on your own machine:
1. Clone the repo:
   ```sh
   git clone https://github.com/your_username/repo_name.git
   ```
2. Install depencencies:
   ```sh
   npm install
   ```
3. Create .env file and put your api key in there
     * go to [toncenter official site](https://toncenter.com/) and get your key using @tonapibot in telegram
     * create .env file:
       ```sh
       touch .env
       ```
     * open it with your favourite editor (vim btw) and write the folowing
       ```sh
       VITE_TON_CENTER_API_KEY=<your_own_toncenter_api_key>
       ```
4. Launch app
   ```sh
   npm run dev
   ```
5. Open [http://localhost:5173/](http://localhost:5173) and start using decentralized coinflip!
