<script lang="ts" setup></script>
<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">About us</a></li>
            <li><a href="#">Service</a></li>
            <li><a href="#">license</a></li>
            <li><a href="#">endow</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Order Return</a></li>
            <li><a href="#">Status Order</a></li>
            <li><a href="#">Payment</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Online</h4>
          <ul>
            <li><a href="#">Time</a></li>
            <li><a href="#">Bag</a></li>
            <li><a href="#">Shopee</a></li>
            <li><a href="#">Amazon</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Follow me</h4>
          <div class="social-links">
            <a href="#"><i class="pi pi-facebook"></i></a>
            <a href="#"><i class="pi pi-twitter"></i></a>
            <a href="#"><i class="pi pi-instagram"></i></a>
            <a href="#"><i class="pi pi-globe"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: auto;
  padding-left: 200px;
  color: #FFFFFF !important;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

ul {
  list-style: none;
}

.footer {
  background-color: rgb(231, 113, 71);
  padding: 70px 0;
  width: 100%;
  margin-top: 50px;
  color: #FFFFFF;
}

.footer-col {
  width: 25%;
  padding: 0 15px;
}

.footer-col h4 {
  font-size: 18px;
  text-transform: capitalize;
  margin-bottom: 35px;
  font-weight: 500;
  position: relative;
}

.footer-col h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -10px;
  background-color: #e91e63;
  height: 2px;
  box-sizing: border-box;
  width: 50px;
}

.footer-col ul li:not(:last-child) {
  margin-bottom: 10px;
}

.footer-col ul li a {
  font-size: 16px;
  text-transform: capitalize;
  text-decoration: none;
  font-weight: 300;
  color: #FFFFFF;
  display: block;
  transition: all 0.3s ease;
}

.footer-col ul li a:hover {
  color: #FFFFFF;
  padding-left: 8px;
}

.footer-col .social-links a {
  display: inline-block;
  height: 40px;
  width: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 10px 10px 0;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  color: #FFFFFF;
  transition: all 0.5s ease;
}
</style>
