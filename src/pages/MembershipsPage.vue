<template>
  <div class="memberships">
    <div class="background_blue"></div>
    <div class="width-full column justify-center membershipsContainer">
      <div class="memberships_description column justify-center q-px-md">
        <p class="text-weight-medium text-h4 text-center memberships_title">
          Planes flexibles & precios
        </p>
        <p class="text-subtitle1 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          suscipit enim nunc, et accumsan lectus egestas nec.
        </p>
      </div>
      <div class="memberships_plans width-full q-pb-xl">
        <div class="plan">
          <q-img
            src="./../assets/plane.svg"
            spinner-color="white"
            style="height: 58px; max-width: 62px"
          />
          <p
            class="text-h6 text-weight-bold text-secondary text-uppercase q-my-md"
          >
            Free
          </p>
          <p class="text-weight-medium text-h3">
            <span class="text-h5">$</span>0
          </p>
          <ul class="benefitsList">
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
          </ul>
          <div class="full-width button">
            <q-btn
              outline
              color="secondary"
              label="Comprar"
              class="full-width"
            />
          </div>
        </div>
        <div class="plan">
          <q-img
            src="./../assets/rocket.svg"
            spinner-color="white"
            style="height: 68px; max-width: 68px"
          />
          <p
            class="text-h6 text-weight-bold text-secondary text-uppercase q-my-md"
          >
            Pro
          </p>
          <p class="text-weight-medium text-h3">
            <span class="text-h5">$</span>15
          </p>
          <ul class="benefitsList">
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
            <li>
              <q-img
                src="./../assets/checkIcon.svg"
                spinner-color="white"
                style="height: 22px; max-width: 22px"
              />
              <p>Lorem ipsum dolor sit amet</p>
            </li>
          </ul>
          <div class="full-width button">
            <q-btn
              outline
              color="secondary"
              label="Comprar"
              class="full-width"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.benefitsList {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.memberships .button {
  display: flex;
  align-items: flex-end;
  flex: 1;
}

.benefitsList p {
  margin: 0;
}

.benefitsList li {
  gap: 8px;
  align-items: center;
  width: 100%;
  display: flex;
}

.membershipsContainer {
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.memberships_plans {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 100px;
  padding: 0 32px 80px;
}

.background_blue {
  background: #272e67;
  width: 100%;
  position: absolute;
  height: 416px;
}

.memberships_description {
  color: #ffffff;
  height: 326px;
  max-width: 736px;
}

.memberships {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: #e9e9e9;
}

.plan {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 294px;
  height: 427px;
  border-radius: 4px;
  padding: 32px;
}
</style>
