// import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import videoHero from "../../assets/images/3188887-hd_1920_1080_25fps.mp4";
import Header from "../../components/Header/Header";

import "./MainPage.scss";
function MainPage() {
  return (
    <body>
      <div>
        <section className="hero">
          <Header />
          <div className="hero__video">
            <video src={videoHero} autoPlay loop muted role="presentation" />
          </div>
        </section>
        <main>
          <section className="info">
            <p>
              Hey there, welcome to Wine me UP! - your go-to spot for nailing
              that perfect food and wine combo!{" "}
            </p>
            <p>
              Whether you're prepping for a dinner party, trying to impress a
              date, or just feel like treating yourself, we've got your back.{" "}
            </p>
            <p>
              Picture this: you're craving a juicy burger or maybe a creamy
              pasta. What wine do you pair it with?{" "}
            </p>
            <p>
              That's where we step in. Our site's like your fun, easygoing
              friend who just happens to know a ton about wine.{" "}
            </p>
            <p>
              We'll guide you through our awesome selection, matching your fave
              dishes with the perfect vino. From fancy reds to refreshing
              whites, we've got bottles from all over the globe, just waiting to
              jazz up your meal.{" "}
            </p>
            <p>
              And hey, we're not just about the wine - we're all about sharing
              tips, tricks, and stories to make your dining experience even more
              awesome.
            </p>
            <p>
              {" "}
              So, whether you're a wine newbie or a seasoned pro, come hang out
              with us at Wine me UP!. Let's take your taste buds on an epic
              adventure together!"
            </p>
          </section>
        </main>
        <div className="button">
          <Link to="/form">
            <button>Let`s Get Started</button>
          </Link>
        </div>
      </div>
    </body>
  );
}

export default MainPage;