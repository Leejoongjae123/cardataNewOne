import React from "react";
import { Pagination } from "@nextui-org/react";

function MyPrice() {
  return (
    <div>
      <div class="flex items-center justify-between text-black dark:text-white py-3 mt-8">
        <h3 class="text-xl font-semibold"> List </h3>
        <a href="#" class="text-sm text-blue-500">
          See all
        </a>
      </div>
      <div class="box p-5 mt-4">
        <div class="card-list">
          <a href="blog-read.html" class="lg:order-1">
            <div class="card-list-media h-32">
              <img src="/images/blog/img-2.jpg" alt="" />
            </div>
          </a>
          <div class="card-list-body">
            <a href="blog-read.html">
              {" "}
              <h3 class="card-list-title">
                {" "}
                Top amazing web demos and experiments in 2024 should know about{" "}
              </h3>{" "}
            </a>
            <p class="card-list-text">
              {" "}
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam,
            </p>
            <a href="#">
              {" "}
              <div class="card-list-link"> Jesse Steeve </div>{" "}
            </a>
            <div class="card-list-info">
              <div class="flex items-center gap-2">
                <ion-icon name="heart-outline" class="text-lg"></ion-icon>
                45
              </div>
              <div class="md:block hidden">·</div>
              <div class="flex items-center gap-2">
                <ion-icon
                  name="chatbubble-ellipses-outline"
                  class="text-lg"
                ></ion-icon>
                156.9K
              </div>
            </div>
          </div>
        </div>
        <hr class="card-list-divider" />
        <div class="card-list">
          <a href="blog-read.html" class="lg:order-1">
            <div class="card-list-media h-32">
              <img src="/images/blog/img-3.jpg" alt="" />
            </div>
          </a>
          <div class="card-list-body">
            <a href="blog-read.html">
              {" "}
              <h3 class="card-list-title">
                {" "}
                Interesting JavaScript and CSS libraries should Know About{" "}
              </h3>{" "}
            </a>
            <p class="card-list-text">
              {" "}
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam,
            </p>
            <a href="#">
              {" "}
              <div class="card-list-link"> Monroe Parker </div>{" "}
            </a>
            <div class="card-list-info">
              <div class="flex items-center gap-2">
                <ion-icon name="heart-outline" class="text-lg"></ion-icon>
                45
              </div>
              <div class="md:block hidden">·</div>
              <div class="flex items-center gap-2">
                <ion-icon
                  name="chatbubble-ellipses-outline"
                  class="text-lg"
                ></ion-icon>
                156.9K
              </div>
            </div>
          </div>
        </div>
        <hr class="card-list-divider" />
        <div class="card-list">
          <a href="blog-read.html" class="lg:order-1">
            <div class="card-list-media h-32">
              <img src="/images/blog/img-4.jpg" alt="" />
            </div>
          </a>
          <div class="card-list-body">
            <a href="blog-read.html">
              {" "}
              <h3 class="card-list-title">
                Interesting javaScript and CSS libraries you should be learn
              </h3>{" "}
            </a>
            <p class="card-list-text">
              {" "}
              consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
              enim ad minim veniam,
            </p>
            <a href="#">
              {" "}
              <div class="card-list-link"> Martin Gray </div>{" "}
            </a>
            <div class="card-list-info">
              <div class="flex items-center gap-2">
                <ion-icon name="heart-outline" class="text-lg"></ion-icon>
                45
              </div>
              <div class="md:block hidden">·</div>
              <div class="flex items-center gap-2">
                <ion-icon
                  name="chatbubble-ellipses-outline"
                  class="text-lg"
                ></ion-icon>
                156.9K
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <Pagination className="text-white" total={10} initialPage={1} />
      </div>
    </div>
  );
}

export default MyPrice;
