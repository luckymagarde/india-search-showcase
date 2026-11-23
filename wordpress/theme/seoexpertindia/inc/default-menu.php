<?php
/**
 * Default header menu (same structure as the imported menu); used until a menu is assigned.
 *
 * @package SEOExpertIndia
 */

defined( 'ABSPATH' ) || exit;

return array(
	array( 'title' => 'Home', 'path' => '/' ),
	array( 'title' => 'About', 'path' => '/about/' ),
	array( 'title' => 'Services', 'path' => '/services/', 'mega' => array(
		array( 'title' => 'SEO Services', 'icon' => 'Search', 'items' => array(
			array( 'title' => 'Newcastle SEO Expert', 'path' => '/service/newcastle-seo-expert/', 'icon' => 'MapPin' ),
			array( 'title' => 'SEO Services', 'path' => '/service/best-seo-services-in-india/', 'icon' => 'Search' ),
			array( 'title' => 'Best SEO Linkbuilding Services in India', 'path' => '/service/best-seo-linkbuilding-services-in-india/', 'icon' => 'Link2' ),
			array( 'title' => 'Best SEO Services in UAE', 'path' => '/service/best-seo-services-in-uae/', 'icon' => 'Globe' ),
			array( 'title' => 'Global SEO Services', 'path' => '/service/global-seo-services/', 'icon' => 'Languages' ),
			array( 'title' => 'SEO Expert New York', 'path' => '/service/seo-expert-new-york/', 'icon' => 'Building2' ),
			array( 'title' => 'San Diego SEO Expert', 'path' => '/service/san-diego-seo-expert/', 'icon' => 'Compass' ),
			array( 'title' => 'SEO Expert London UK', 'path' => '/service/seo-expert-london-uk/', 'icon' => 'Landmark' ),
			array( 'title' => 'SEO Expert Denmark', 'path' => '/service/seo-expert-denmark/', 'icon' => 'Flag' ),
			array( 'title' => 'Best SEO Experts in Malta', 'path' => '/service/best-seo-experts-in-malta/', 'icon' => 'Anchor' ),
			array( 'title' => 'Best Local SEO Services in India', 'path' => '/service/best-local-seo-services-in-india/', 'icon' => 'MapPinned' ),
		) ),
		array( 'title' => 'Website Development', 'icon' => 'Code2', 'items' => array(
			array( 'title' => 'Web Agency Copenhagen, Denmark', 'path' => '/service/web-agency-copenhagen-denmark/', 'icon' => 'Palette' ),
			array( 'title' => 'Web Development Company Paris', 'path' => '/service/web-development-company-paris/', 'icon' => 'Code2' ),
			array( 'title' => 'Web Development Company Netherlands', 'path' => '/service/web-development-company-netherlands/', 'icon' => 'Workflow' ),
			array( 'title' => 'Web Development Company UK', 'path' => '/service/web-development-company-uk/', 'icon' => 'Laptop' ),
			array( 'title' => 'Web Development Agency Germany', 'path' => '/service/web-development-agency-germany/', 'icon' => 'Settings' ),
			array( 'title' => 'Web Development Company Washington', 'path' => '/service/web-development-company-washington/', 'icon' => 'PanelsTopLeft' ),
			array( 'title' => 'Web Development Company USA', 'path' => '/service/web-development-company-usa/', 'icon' => 'MonitorSmartphone' ),
			array( 'title' => 'Website Development Company Malta', 'path' => '/service/website-development-company-malta/', 'icon' => 'LayoutTemplate' ),
			array( 'title' => 'Web Development Company India', 'path' => '/service/web-development-company-india/', 'icon' => 'Braces' ),
		) ),
		array( 'title' => 'Industry-Based SEO Services', 'icon' => 'Building2', 'items' => array(
			array( 'title' => 'SEO for Law Firm', 'path' => '/service/seo-for-law-firm/', 'icon' => 'Scale' ),
			array( 'title' => 'SEO Services for Education Industry', 'path' => '/service/seo-services-for-education-industry/', 'icon' => 'GraduationCap' ),
			array( 'title' => 'Home Improvements', 'path' => '/service/home-improvements/', 'icon' => 'Hammer' ),
			array( 'title' => 'Pet Services', 'path' => '/service/pet-services/', 'icon' => 'PawPrint' ),
			array( 'title' => 'SEO for IT Industry', 'path' => '/service/seo-for-it-industry/', 'icon' => 'Monitor' ),
			array( 'title' => 'Automobile Industries SEO', 'path' => '/service/automobile-industries-seo/', 'icon' => 'Car' ),
			array( 'title' => 'Ecommerce Website SEO Services', 'path' => '/service/ecommerce-website-seo-services/', 'icon' => 'ShoppingBag' ),
			array( 'title' => 'Real Estate Website SEO Services', 'path' => '/service/real-estate-website-seo-services/', 'icon' => 'House' ),
			array( 'title' => 'Healthcare Website SEO Services', 'path' => '/service/healthcare-website-seo-services/', 'icon' => 'HeartPulse' ),
		) ),
	) ),
	array( 'title' => 'Recent Work', 'path' => '/recent-work/' ),
	array( 'title' => 'Testimonials', 'path' => '/testimonials/' ),
	array( 'title' => 'Contact', 'path' => '/contact/' ),
	array( 'title' => 'FAQs', 'path' => '/faq/' ),
	array( 'title' => 'Blog', 'path' => '/blog/' ),
);
