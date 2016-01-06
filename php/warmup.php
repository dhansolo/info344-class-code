<?php 
$number = rand(1, 100);
echo "your new random value is $number\n";
$months = cal_info(0);
echo "\n";
$months = $months['months'];
foreach($months as $month) {
	echo $month . "\n";
}
sort($months);
echo "\n";
foreach($months as $month) {
	echo $month . "\n";
}
?>