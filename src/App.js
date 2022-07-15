import { createRef, useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const inputRef = createRef();

  useEffect(() => {
    inputRef.current.focus();
    setInterval(() => {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&&price_change_percentage=24h"
        )
        .then((response) => {
          setCoins(response.data);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    }, 1000);
  }, [inputRef]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1 className="text-center my-4">Cryptocurrency Tracker</h1>
      <input
        type="text"
        className="text-center form-control"
        style={{ width: "15rem", margin: "2rem auto" }}
        placeholder="Search Crypto"
        onChange={handleSearch}
        ref={inputRef}
      />
      <div className="container mt-5 text-center">
        {loading ? (
          <div className="spinner-border my-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <table className="table text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Coin</th>
                <th scope="col">Price</th>
                <th scope="col">24hr Change %</th>
                <th scope="col">Volume</th>
                <th scope="col">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                return (
                  <tr key={coin.market_cap_rank}>
                    <th scope="row">{coin.market_cap_rank}</th>
                    <td>
                      <img
                        className="img-fluid"
                        src={coin.image}
                        alt="logo"
                        style={{
                          width: "auto",
                          height: "1.5rem",
                          margin: "0 0.5rem 0 0",
                        }}
                      />
                      {coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}
                    </td>
                    <td>$ {coin.current_price}</td>
                    {coin.price_change_24h < 0 ? (
                      <td className="text-danger">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                    ) : (
                      <td className="text-success">
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                    )}

                    <td>$ {coin.total_volume}</td>
                    <td>$ {coin.market_cap}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;
