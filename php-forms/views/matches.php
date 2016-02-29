<h1>Possible Matches</h1>
<ul>
<<<<<<< HEAD
	<?php foreach($matches as $match): ?>
	<li>
		<?= htmlentities($match['primary_city']) ?>
	    <?= htmlentities($match['state']) ?>
		<?= htmlentities($match['zip']) ?>
		<?= htmlentities($match['country']) ?>
	</li>
	<?php endforeach; ?>
=======
    <?php foreach($matches as $match): ?>
    <li>
        <?= htmlentities($match['primary_city']) ?>,
        <?= htmlentities($match['state']) ?>
        <?= htmlentities($match['zip']) ?>
        <?= htmlentities($match['country']) ?>
    </li>
    <?php endforeach; ?>
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
</ul>