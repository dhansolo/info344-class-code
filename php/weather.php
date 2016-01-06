<?php
$requesturl = parse_url($_SERVER['REQUEST_URI']);
$city = substr($requesturl['path'], 1);
if(strlen($city) == 0) {
    $city = 'seattle';
}
$url = 'http://api.openweathermap.org/data/2.5/weather?q=' . $city . ',us&units=imperial&appid=2de143494c0b295cca9337e1e96b00e0';
$result = json_decode(file_get_contents($url), true);
echo '<pre>';
print_r($result);
?>