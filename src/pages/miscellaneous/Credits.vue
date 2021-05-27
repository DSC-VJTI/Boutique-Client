<template>
  <div
    class="container flex flex-col mx-auto w-11/12 md:w-4/5 items-center justify-center"
  >
    <h1 class="text-gray-800 text-center text-5xl font-bold font-serif mt-8">
      Credits
    </h1>
    <p class="w-4/5 text-gray-800 text-center text-2xl font-light my-8">
      This website is developed by
      <a
        class="text-green-500 italic font-semibold"
        href="https://www.dscvjti.tech/"
        target="blank_"
        >Google Developer Student Clubs, VJTI</a
      >
    </p>

    <div id="team-container">
      <div
        class="grid grid-flow-row grid-rows-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-16 md:m-0"
      >
        <div class="profile text-center">
          <div class="img-box">
            <img src="..\..\assets\images\saif.jpeg" class="img-responsive" />
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/saif-1204-kazi/"
                  target="blank_"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
              <li>
                <a href="https://github.com/Saif807380" target="blank_"
                  ><i class="fab fa-github"></i
                ></a>
              </li>
              <li>
                <a href="https://twitter.com/saifkazi_" target="blank_"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
            </ul>
          </div>
          <div class="w-full p-4">
            <h3 class="font-light text-gray-800 text-3xl">Saif Kazi</h3>
            <p class="font-light text-gray-800 text-lg">Team Member</p>
          </div>
        </div>

        <div class="profile text-center">
          <div class="img-box">
            <img
              src="..\..\assets\images\devanshi.jpeg"
              class="img-responsive"
            />
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/devanshi-shah-5aab44190"
                  target="blank_"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
              <li>
                <a href="https://github.com/Devanshi1500" target="blank_"
                  ><i class="fab fa-github"></i
                ></a>
              </li>
              <li>
                <a href="https://twitter.com/devanshi1500" target="blank_"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
            </ul>
          </div>
          <div class="w-full p-4">
            <h3 class="font-light text-gray-800 text-3xl">Devanshi Shah</h3>
            <p class="font-light text-gray-800 text-lg">Team Member</p>
          </div>
        </div>

        <div class="profile text-center">
          <div class="img-box">
            <img src="..\..\assets\images\parth.jpeg" class="img-responsive" />
            <ul>
              <li>
                <a href="https://linkedin.com/in/parthshah576" target="blank_"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
              <li>
                <a href="https://github.com/Parth576" target="blank_"
                  ><i class="fab fa-github"></i
                ></a>
              </li>
              <li>
                <a href="http://localhost:8080/credits#" target="blank_"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
            </ul>
          </div>
          <div class="w-full p-4">
            <h3 class="font-light text-gray-800 text-3xl">Parth Shah</h3>
            <p class="font-light text-gray-800 text-lg">Team Member</p>
          </div>
        </div>

        <div class="profile text-center">
          <div class="img-box">
            <img src="..\..\assets\images\vishal.jpg" class="img-responsive" />
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/vishalrameshpatil"
                  target="blank_"
                  ><i class="fab fa-linkedin-in"></i
                ></a>
              </li>
              <li>
                <a href="https://github.com/SpecTEviL" target="blank_"
                  ><i class="fab fa-github"></i
                ></a>
              </li>
              <li>
                <a href="https://twitter.com/VishalPatil1810" target="blank_"
                  ><i class="fab fa-twitter"></i
                ></a>
              </li>
            </ul>
          </div>
          <div class="w-full p-4">
            <h3 class="font-light text-gray-800 text-3xl">Vishal Patil</h3>
            <p class="font-light text-gray-800 text-lg">Team Member</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#team-container {
  overflow: hidden;
  text-align: center;
  padding-top: 20px;
  margin: 0 3%;
}

#team-container h1 {
  font-size: var(--h1fontsize);
  font-weight: var(--h1fontweight);
}

.profile {
  margin: 10px;
}

.profile .img-box {
  opacity: 1;
  display: block;
  position: relative;
}

.img-box::after {
  content: "";
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 9999px;
  width: 100%;
}

.img-box:hover::after {
  opacity: 1;
}

.img-box:hover ul {
  opacity: 1;
}

.profile .img-box img {
  width: 100%;
  height: auto;
  border-radius: 1000px;
}

.img-box ul {
  padding: 20px 0;
  position: absolute;
  z-index: 1;
  transform: translateX(-50%);
  opacity: 0;
  transition: 0.5s;
  left: 52.5%;
  bottom: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.img-box ul li {
  font-size: 30px;
  padding: 10px;
  color: white;
}

.img-box ul li:hover {
  opacity: 0.8;
}
</style>
