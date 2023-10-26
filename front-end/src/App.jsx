import './assets/css/style.css'
import './assets/css/bootstrap.css'
import './assets/css/creditly.css'
import './assets/css/easy-responsive-tabs.css'
import './assets/css/flexslider.css'
import './assets/css/font-awesome.css'

import './assets/js/jquery-1.11.1.min.js'
import './assets/js/counterup.min.js'
import './assets/js/creditly'
import './assets/js/easing'
import './assets/js/easyResponsiveTabs'
import './assets/js/jquery.flexslider.js'
import './assets/js/jquery.wmuSlider'
import './assets/js/minicart'
import './assets/js/move-top'
import './assets/js/okzoom'
import './assets/js/waypoints.min.js'

import Image4 from './assets/images/4.jpg'
import Image5 from './assets/images/5.jpg'
import Image6 from './assets/images/6.jpg'
import Image1 from './assets/images/1.jpg'
import Image2 from './assets/images/2.jpg'
import Image3 from './assets/images/3.jpg'
import Image7 from './assets/images/7.jpg'
import Image8 from './assets/images/8.jpg'
import Image9 from './assets/images/9.jpg'
import Image10 from './assets/images/10.jpg'
import Image11 from './assets/images/11.jpg'
import Card from './assets/images/card.png'
import Tag from './assets/images/tag.png'
import Offer from './assets/images/offer.png'
import { useEffect } from 'react'
export default function App(){
  useEffect(() => {
    $(document).ready(function(){
      $(window).load(function(){
        $('.flexslider').flexslider({
        animation: "slide",
        start: function(slider){
          $('body').removeClass('loading');
        }
        });
      });

      var navoffeset=$(".agileits_header").offset().top;
      $(window).scroll(function(){
        var scrollpos=$(window).scrollTop(); 
        if(scrollpos >=navoffeset){
          $(".agileits_header").addClass("fixed");
        }else{
          $(".agileits_header").removeClass("fixed");
        }
      });

      $(".scroll").click(function(event){		
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
      });
    })
  },[]);
  return (
    <>
      <div className="agileits_header">
		<div className="w3l_offers">
			<a href="products.html">Today's special Offers !</a>
		</div>
		<div className="w3l_search">
			<form action="#" method="post">
				<input type="text" name="Product" defaultValue="Search a product..."  required=""/>
				<input type="submit" defaultValue=" "/>
			</form>
		</div>
		<div className="product_list_header">  
			<form action="#" method="post" className="last">
                <fieldset>
                    <input type="hidden" name="cmd" defaultValue="_cart" />
                    <input type="hidden" name="display" defaultValue="1" />
                    <input type="submit" name="submit" defaultValue="View your cart" className="button" />
                </fieldset>
            </form>
		</div>
		<div className="w3l_header_right">
			<ul>
				<li className="dropdown profile_details_drop">
					<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user" aria-hidden="true"></i><span className="caret"></span></a>
					<div className="mega-dropdown-menu">
						<div className="w3ls_vegetables">
							<ul className="dropdown-menu drp-mnu">
								<li><a href="login.html">Login</a></li> 
								<li><a href="login.html">Sign Up</a></li>
							</ul>
						</div>                  
					</div>	
				</li>
			</ul>
		</div>
		<div className="w3l_header_right1">
			<h2><a href="mail.html">Contact Us</a></h2>
		</div>
		<div className="clearfix"> </div>
	</div>
{/* <!-- script-for sticky-nav --> */}
{/* <!-- //script-for sticky-nav --> */}
	<div className="logo_products">
		<div className="container">
			<div className="w3ls_logo_products_left">
				<h1><a href="index.html"><span>Grocery</span> Store</a></h1>
			</div>
			<div className="w3ls_logo_products_left1">
				<ul className="special_items">
					<li><a href="events.html">Events</a><i>/</i></li>
					<li><a href="about.html">About Us</a><i>/</i></li>
					<li><a href="products.html">Best Deals</a><i>/</i></li>
					<li><a href="services.html">Services</a></li>
				</ul>
			</div>
			<div className="w3ls_logo_products_left1">
				<ul className="phone_email">
					<li><i className="fa fa-phone" aria-hidden="true"></i>(+0123) 234 567</li>
					<li><i className="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:store@grocery.com">store@grocery.com</a></li>
				</ul>
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>
{/* <!-- //header -->
<!-- banner --> */}
	<div className="banner">
		<div className="w3l_banner_nav_left">
			<nav className="navbar nav_bottom">
			 {/* <!-- Brand and toggle get grouped for better mobile display --> */}
			  <div className="navbar-header nav_2">
				  <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				  </button>
			   </div> 
			   {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
				<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav nav_1">
						<li><a href="products.html">Branded Foods</a></li>
						<li><a href="household.html">Households</a></li>
						<li className="dropdown mega-dropdown active">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">Veggies & Fruits<span className="caret"></span></a>				
							<div className="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
								<div className="w3ls_vegetables">
									<ul>	
										<li><a href="vegetables.html">Vegetables</a></li>
										<li><a href="vegetables.html">Fruits</a></li>
									</ul>
								</div>                  
							</div>				
						</li>
						<li><a href="kitchen.html">Kitchen</a></li>
						<li><a href="short-codes.html">Short Codes</a></li>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">Beverages<span className="caret"></span></a>
							<div className="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
								<div className="w3ls_vegetables">
									<ul>
										<li><a href="drinks.html">Soft Drinks</a></li>
										<li><a href="drinks.html">Juices</a></li>
									</ul>
								</div>                  
							</div>	
						</li>
						<li><a href="pet.html">Pet Food</a></li>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">Frozen Foods<span className="caret"></span></a>
							<div className="dropdown-menu mega-dropdown-menu w3ls_vegetables_menu">
								<div className="w3ls_vegetables">
									<ul>
										<li><a href="frozen.html">Frozen Snacks</a></li>
										<li><a href="frozen.html">Frozen Nonveg</a></li>
									</ul>
								</div>                  
							</div>	
						</li>
						<li><a href="bread.html">Bread & Bakery</a></li>
					</ul>
				 </div>
         {/* <!-- /.navbar-collapse --> */}
			</nav>
		</div>
		<div className="w3l_banner_nav_right">
			<section className="slider">
				<div className="flexslider">
					<ul className="slides">
						<li>
							<div className="w3l_banner_nav_right_banner">
								<h3>Make your <span>food</span> with Spicy.</h3>
								<div className="more">
									<a href="products.html" className="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
						<li>
							<div className="w3l_banner_nav_right_banner1">
								<h3>Make your <span>food</span> with Spicy.</h3>
								<div className="more">
									<a href="products.html" className="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
						<li>
							<div className="w3l_banner_nav_right_banner2">
								<h3>upto <i>50%</i> off.</h3>
								<div className="more">
									<a href="products.html" className="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</section>
			{/* <!-- flexSlider --> */}
			{/* <!-- //flexSlider --> */}
		</div>
		<div className="clearfix"></div>
	</div>
{/* <!-- banner --> */}
	<div className="banner_bottom">
			<div className="wthree_banner_bottom_left_grid_sub">
			</div>
			<div className="wthree_banner_bottom_left_grid_sub1">
				<div className="col-md-4 wthree_banner_bottom_left">
					<div className="wthree_banner_bottom_left_grid">
						<img src={Image4} alt=" " className="img-responsive" />
						<div className="wthree_banner_bottom_left_grid_pos">
							<h4>Discount Offer <span>25%</span></h4>
						</div>
					</div>
				</div>
				<div className="col-md-4 wthree_banner_bottom_left">
					<div className="wthree_banner_bottom_left_grid">
						<img src={Image5} alt=" " className="img-responsive" />
						<div className="wthree_banner_btm_pos">
							<h3>introducing <span>best store</span> for <i>groceries</i></h3>
						</div>
					</div>
				</div>
				<div className="col-md-4 wthree_banner_bottom_left">
					<div className="wthree_banner_bottom_left_grid">
						<img src={Image6} alt=" " className="img-responsive" />
						<div className="wthree_banner_btm_pos1">
							<h3>Save <span>Upto</span> $10</h3>
						</div>
					</div>
				</div>
				<div className="clearfix"> </div>
			</div>
			<div className="clearfix"> </div>
	</div>
{/* <!-- top-brands --> */}
	<div className="top-brands">
		<div className="container">
			<h3>Hot Offers</h3>
			<div className="agile_top_brands_grids">
				<div className="col-md-3 top_brand_left">
					<div className="hover14 column">
						<div className="agile_top_brand_left_grid">
							<div className="tag"><img src={Tag} alt=" " className="img-responsive" /></div>
							<div className="agile_top_brand_left_grid1">
								<figure>
									<div className="snipcart-item block" >
										<div className="snipcart-thumb">
											<a href="single.html"><img title=" " alt=" " src={Image1} /></a>		
											<p>fortune sunflower oil</p>
											<h4>$7.99 <span>$10.00</span></h4>
										</div>
										<div className="snipcart-details top_brand_home_details">
											<form action="checkout.html" method="post">
												<fieldset>
													<input type="hidden" name="cmd" defaultValue="_cart" />
													<input type="hidden" name="add" defaultValue="1" />
													<input type="hidden" name="business" defaultValue=" " />
													<input type="hidden" name="item_name" defaultValue="Fortune Sunflower Oil" />
													<input type="hidden" name="amount" defaultValue="7.99" />
													<input type="hidden" name="discount_amount" defaultValue="1.00" />
													<input type="hidden" name="currency_code" defaultValue="USD" />
													<input type="hidden" name="return" defaultValue=" " />
													<input type="hidden" name="cancel_return" defaultValue=" " />
													<input type="submit" name="submit" defaultValue="Add to cart" className="button" />
												</fieldset>
													
											</form>
									
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3 top_brand_left">
					<div className="hover14 column">
						<div className="agile_top_brand_left_grid">
							<div className="agile_top_brand_left_grid1">
								<figure>
									<div className="snipcart-item block" >
										<div className="snipcart-thumb">
											<a href="single.html"><img title=" " alt=" " src={Image3} /></a>		
											<p>basmati rise (5 Kg)</p>
											<h4>$11.99 <span>$15.00</span></h4>
										</div>
										<div className="snipcart-details top_brand_home_details">
											<form action="#" method="post">
												<fieldset>
													<input type="hidden" name="cmd" defaultValue="_cart" />
													<input type="hidden" name="add" defaultValue="1" />
													<input type="hidden" name="business" defaultValue=" " />
													<input type="hidden" name="item_name" defaultValue="basmati rise" />
													<input type="hidden" name="amount" defaultValue="11.99" />
													<input type="hidden" name="discount_amount" defaultValue="1.00" />
													<input type="hidden" name="currency_code" defaultValue="USD" />
													<input type="hidden" name="return" defaultValue=" " />
													<input type="hidden" name="cancel_return" defaultValue=" " />
													<input type="submit" name="submit" defaultValue="Add to cart" className="button" />
												</fieldset>
											</form>
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3 top_brand_left">
					<div className="hover14 column">
						<div className="agile_top_brand_left_grid">
							<div className="agile_top_brand_left_grid_pos">
								<img src={Offer} alt=" " className="img-responsive" />
							</div>
							<div className="agile_top_brand_left_grid1">
								<figure>
									<div className="snipcart-item block">
										<div className="snipcart-thumb">
											<a href="single.html"><img src={Image3} alt=" " className="img-responsive" /></a>
											<p>Pepsi soft drink (2 Ltr)</p>
											<h4>$8.00 <span>$10.00</span></h4>
										</div>
										<div className="snipcart-details top_brand_home_details">
											<form action="#" method="post">
												<fieldset>
													<input type="hidden" name="cmd" defaultValue="_cart" />
													<input type="hidden" name="add" defaultValue="1" />
													<input type="hidden" name="business" defaultValue=" " />
													<input type="hidden" name="item_name" defaultValue="Pepsi soft drink" />
													<input type="hidden" name="amount" defaultValue="8.00" />
													<input type="hidden" name="discount_amount" defaultValue="1.00" />
													<input type="hidden" name="currency_code" defaultValue="USD" />
													<input type="hidden" name="return" defaultValue=" " />
													<input type="hidden" name="cancel_return" defaultValue=" " />
													<input type="submit" name="submit" defaultValue="Add to cart" className="button" />
												</fieldset>
											</form>
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-3 top_brand_left">
					<div className="hover14 column">
						<div className="agile_top_brand_left_grid">
							<div className="agile_top_brand_left_grid_pos">
								<img src={Offer} alt=" " className="img-responsive" />
							</div>
							<div className="agile_top_brand_left_grid1">
								<figure>
									<div className="snipcart-item block">
										<div className="snipcart-thumb">
											<a href="single.html"><img src={Image4} alt=" " className="img-responsive" /></a>
											<p>dogs food (4 Kg)</p>
											<h4>$9.00 <span>$11.00</span></h4>
										</div>
										<div className="snipcart-details top_brand_home_details">
											<form action="#" method="post">
												<fieldset>
													<input type="hidden" name="cmd" defaultValue="_cart" />
													<input type="hidden" name="add" defaultValue="1" />
													<input type="hidden" name="business" defaultValue=" " />
													<input type="hidden" name="item_name" defaultValue="dogs food" />
													<input type="hidden" name="amount" defaultValue="9.00" />
													<input type="hidden" name="discount_amount" defaultValue="1.00" />
													<input type="hidden" name="currency_code" defaultValue="USD" />
													<input type="hidden" name="return" defaultValue=" " />
													<input type="hidden" name="cancel_return" defaultValue=" " />
													<input type="submit" name="submit" defaultValue="Add to cart" className="button" />
												</fieldset>
											</form>
										</div>
									</div>
								</figure>
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
	</div>
  


	<div className="fresh-vegetables">
		<div className="container">
			<h3>Top Products</h3>
			<div className="w3l_fresh_vegetables_grids">
				<div className="col-md-3 w3l_fresh_vegetables_grid w3l_fresh_vegetables_grid_left">
					<div className="w3l_fresh_vegetables_grid2">
						<ul>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="products.html">All Brands</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="vegetables.html">Vegetables</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="vegetables.html">Fruits</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="drinks.html">Juices</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="pet.html">Pet Food</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="bread.html">Bread & Bakery</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="household.html">Cleaning</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="products.html">Spices</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="products.html">Dry Fruits</a></li>
							<li><i className="fa fa-check" aria-hidden="true"></i><a href="products.html">Dairy Products</a></li>
						</ul>
					</div>
				</div>
				<div className="col-md-9 w3l_fresh_vegetables_grid_right">
					<div className="col-md-4 w3l_fresh_vegetables_grid">
						<div className="w3l_fresh_vegetables_grid1">
							<img src={Image8} alt=" " className="img-responsive" />
						</div>
					</div>
					<div className="col-md-4 w3l_fresh_vegetables_grid">
						<div className="w3l_fresh_vegetables_grid1">
							<div className="w3l_fresh_vegetables_grid1_rel">
								<img src={Image7} alt=" " className="img-responsive" />
								<div className="w3l_fresh_vegetables_grid1_rel_pos">
									<div className="more m1">
										<a href="products.html" className="button--saqui button--round-l button--text-thick" data-text="Shop now">Shop now</a>
									</div>
								</div>
							</div>
						</div>
						<div className="w3l_fresh_vegetables_grid1_bottom">
							<img src={Image7} alt=" " className="img-responsive" />
							<div className="w3l_fresh_vegetables_grid1_bottom_pos">
								<h5>Special Offers</h5>
							</div>
						</div>
					</div>
					<div className="col-md-4 w3l_fresh_vegetables_grid">
						<div className="w3l_fresh_vegetables_grid1">
							<img src={Image9} alt=" " className="img-responsive" />
						</div>
						<div className="w3l_fresh_vegetables_grid1_bottom">
							<img src={Image11} alt=" " className="img-responsive" />
						</div>
					</div>
					<div className="clearfix"> </div>
					<div className="agileinfo_move_text">
						<div className="agileinfo_marquee">
							<h4>get <span className="blink_me">25% off</span> on first order and also get gift voucher</h4>
						</div>
						<div className="agileinfo_breaking_news">
							<span> </span>
						</div>
						<div className="clearfix"></div>
					</div>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
	</div>
  
	<div className="newsletter">
		<div className="container">
			<div className="w3agile_newsletter_left">
				<h3>sign up for our newsletter</h3>
			</div>
			<div className="w3agile_newsletter_right">
				<form action="#" method="post">
					<input type="email" name="Email" defaultValue="Email" required="" />
					<input type="submit" defaultValue="subscribe now" />
				</form>
			</div>
			<div className="clearfix"> </div>
		</div>
	</div>
  
	<div className="footer">
		<div className="container">
			<div className="col-md-3 w3_footer_grid">
				<h3>information</h3>
				<ul className="w3_footer_grid_list">
					<li><a href="events.html">Events</a></li>
					<li><a href="about.html">About Us</a></li>
					<li><a href="products.html">Best Deals</a></li>
					<li><a href="services.html">Services</a></li>
					<li><a href="short-codes.html">Short Codes</a></li>
				</ul>
			</div>
			<div className="col-md-3 w3_footer_grid">
				<h3>policy info</h3>
				<ul className="w3_footer_grid_list">
					<li><a href="faqs.html">FAQ</a></li>
					<li><a href="privacy.html">privacy policy</a></li>
					<li><a href="privacy.html">terms of use</a></li>
				</ul>
			</div>
			<div className="col-md-3 w3_footer_grid">
				<h3>what in stores</h3>
				<ul className="w3_footer_grid_list">
					<li><a href="pet.html">Pet Food</a></li>
					<li><a href="frozen.html">Frozen Snacks</a></li>
					<li><a href="kitchen.html">Kitchen</a></li>
					<li><a href="products.html">Branded Foods</a></li>
					<li><a href="household.html">Households</a></li>
				</ul>
			</div>
			<div className="col-md-3 w3_footer_grid">
				<h3>twitter posts</h3>
				<ul className="w3_footer_grid_list1">
					<li><label className="fa fa-twitter" aria-hidden="true"></label><i>01 day ago</i><span>Non numquam <a href="#">http://sd.ds/13jklf#</a>
						eius modi tempora incidunt ut labore et
						<a href="#">http://sd.ds/1389kjklf#</a>quo nulla.</span></li>
					<li><label className="fa fa-twitter" aria-hidden="true"></label><i>02 day ago</i><span>Con numquam <a href="#">http://fd.uf/56hfg#</a>
						eius modi tempora incidunt ut labore et
						<a href="#">http://fd.uf/56hfg#</a>quo nulla.</span></li>
				</ul>
			</div>
			<div className="clearfix"> </div>
			<div className="agile_footer_grids">
				<div className="col-md-3 w3_footer_grid agile_footer_grids_w3_footer">
					<div className="w3_footer_grid_bottom">
						<h4>100% secure payments</h4>
						<img src={Card} alt=" " className="img-responsive" />
					</div>
				</div>
				<div className="col-md-3 w3_footer_grid agile_footer_grids_w3_footer">
					<div className="w3_footer_grid_bottom">
						<h5>connect with us</h5>
						<ul className="agileits_social_icons">
							<li><a href="#" className="facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
							<li><a href="#" className="twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
							<li><a href="#" className="google"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
							<li><a href="#" className="instagram"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
							<li><a href="#" className="dribbble"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="clearfix"> </div>
			</div>
			<div className="wthree_footer_copy">
				<p>© 2016 Grocery Store. All rights reserved | Design by <a href="http://w3layouts.com/">W3layouts</a></p>
			</div>
		</div>
	</div>
    </>
  )
}
