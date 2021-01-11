// @flow
import * as React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../../CSS/search.css";
import CloseIcon from "@material-ui/icons/Close";
// import Image from "../../images/image1.png"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "30ch",
    },
  },
}));
function SearchPage() {
  const [offers, setOffers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [searchDefault, setDefault] = useState("Search");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [error, setError] = useState("");
  const classes = useStyles();
  // let searchDefault = 'Search'
  // let url1 = 'http://localhost:5000/';
  //  let url1 = 'http://18.217.95.60/backend/'
  useEffect(() => {
    axios
      .get("api/infulencerOffer/getAllOffers")
      .then((res) => {
        setOffers(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const resetIt = () => {
    setSearch("");
    axios
      .get("api/infulencerOffer/getAllOffers")
      .then((res) => {
        setOffers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callSearchApi = () => {
    axios
      .get("api/infulencerOffer/getSearchProducts/" + search)
      .then((res) => {
        setOffers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(search);
  };

  const filterNow = (e) => {
    e.preventDefault();
    console.log(maxPrice, minPrice);

    if (minPrice !== "" && maxPrice !== "") {
      if (maxPrice < minPrice) {
        setError("Min price should be less than max price*");
      } else {
        axios
          .post("api/infulencerOffer/getPrice", {
            maxPrice: maxPrice,
            minPrice: minPrice,
          })
          .then((res) => {
            setOffers(res.data);
            setFilter(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else if (minPrice === "" && maxPrice === "") {
      setError("Fields cannot be empty*");
    } else {
      setError("");
      axios
        .get("api/infulencerOffer/getPrice/" + maxPrice + "/" + minPrice)
        .then((res) => {
          setFilter(false);
          setOffers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    // #F0F3F5
    <div className="container-fluid">
      <div className="row ">
        <div className="col-lg-9 col-xl-9 col-md-9 col-xs-12 col-sm-12 order-10 order-sm-1">
          <div className="search">
            {/* <div className="col-1"> */}
            <button
              type="submit"
              className="form-control form-control-lg btn-search"
              onClick={callSearchApi}
            >
              <SearchIcon className="search-icon" />
            </button>
            {/* </div> */}
            {/* <div
              className="col-10"
              style={{
                verticleAlign: "sub",
              }}
            > */}
            {search === "" ? (
              <input
                type="text"
                placeholder="Search"
                name="search"
                onChange={onSearch}
                className="form-control form-control-lg search-input"
              />
            ) : (
              <input
                type="text"
                placeholder={search}
                name="search"
                style={{
                  width: "100%",
                  border: "none",
                  backgroundColor: "#F0F3F5",
                  verticalAlign: "-webkit-baseline-middle",
                }}
                onChange={onSearch}
              />
            )}
            {/* </div> */}
            {/* <div className="col-1"> */}
            {search !== "" ? (
              <span
                onClick={resetIt}
                style={{
                  cursor: "pointer",
                  color: "#DF362D",
                }}
              >
                <CloseIcon />
              </span>
            ) : (
              <span></span>
            )}
            {/* </div> */}
          </div>
        </div>
        <div
          className="col-lg-3 col-xl-3 col-md-3 col-xs-4 col-sm-4 order-1 order-sm-10"
          style={{
            marginInline: "auto",
          }}
        >
          <span className="filterButton">
            <button
              className="filter-btn btn-block"
              onClick={() => {
                setFilter(true);
              }}
            >
              Filters
            </button>
          </span>
        </div>
      </div>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map((obj, i) => (
            <div
              className="col-lg-4 col-xl-4 col-md-4 col-sm-12 col-xs-12 search_cards_grid "
            >
              <div class="card img-fluid">
                <img
                  class="card-img-top"
                  // src={axios.defaults.baseURL+obj.image}
                  src="data:image/png;base64,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"
                  alt="Card image"
                  style={{
                    height: "-webkit-fill-available",
                  }}
                />
                <div class="card-img-overlay-search">
                  {/* <h4> {obj.title} </h4>
                  <h5>${obj.price}</h5> */}
                  <h4> Instagram Product Promotion <br/> <span>$120</span> </h4>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Dialog onClose={() => {setFilter(false)}} aria-labelledby="customized-dialog-title" open={filter}>
                       Hello from filter page
                        <br/>
                        
                </Dialog> */}
      <Drawer
        anchor={"right"}
        open={filter}
        onClose={() => {
          setFilter(false);
        }}
      >
        <br />
        <h3
          style={{
            textAlign: "center",
            color: "#DF362D",
            fontWeight: "bold",
          }}
        >
          Filter Box
        </h3>
        <br />
        <Divider />
        <br />
        <p
          style={{
            color: "red",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          {" "}
          {error}{" "}
        </p>
        <div className="container-fluid">
          <form
            className={classes.root}
            onSubmit={filterNow}
            noValidate
            autoComplete="off"
          >
            <div className="row">
              <TextField
                fullWidth={true}
                color="secondary"
                id="outlined-basic"
                label="Min Price"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setMinPrice(e.target.value);
                }}
              />
            </div>

            <div className="row">
              <TextField
                fullWidth={true}
                color="secondary"
                id="outlined-basic"
                label="Max Price"
                variant="outlined"
                type="number"
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
              />
            </div>

            <div className="row">
              <button className="my-button1 btn-block" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </Drawer>
    </div>
  );
}
export default SearchPage;
