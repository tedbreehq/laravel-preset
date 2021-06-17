import { Preset, color } from 'apply';

Preset.setName('laravel-preset');
Preset.option('install', true);
// Preset.option('vue', true);

Preset.extract('default');

Preset.delete(['/resources/js', '/webpack.mix.js'])
	.withoutTitle()

Preset.edit('.gitignore')
	.withTitle(`Updating ${color.magenta('.gitignore')}...`)
	.addBefore('/public/hot', ['/public/build', '/public/mix-manifest.json'])

// Preset.edit('resources/views/welcome.blade.php')
// 	.ifNotOption('vue')
// 	.withoutTitle()
// 	.addAfter('<title>', [
// 		'@vite'
// 	]);

// Common packages
Preset.group(preset => {
	preset.editNodePackages()
		.remove('laravel-mix')
		.remove("lodash")
		.addDev("lodash-es", "^4.17.19")
		.addDev('vite', '^2.0.1')
		.addDev('laravel-vite', '^0.0.7')
		.delete(() => ['development', 'watch', 'watch-poll', 'hot', 'prod', 'production'].map(command => `scripts.${command}`))

	preset.editNodePackages()
		.merge({
			scripts: {
				dev: 'vite',
				build: 'vite build',
				serve: 'vite preview'
			}
		});
})
.withTitle('Updating package.json...');

// Vue
Preset.group((preset) => {
	preset.delete(['resources/views/welcome.blade.php'])
	preset.extract('default')
	
	preset.edit('routes/web.php')
		.update((content) => content.replace('welcome', 'app'))
		
	preset.editNodePackages()
		.add('vue', '^3.0.5')
		.addDev('@vue/compiler-sfc', '^3.0.5')
		.addDev('@vitejs/plugin-vue', '^1.1.4')

}).withTitle('Installing Vue...')

// Tailwind CSS
Preset.group(preset => {
	preset.editNodePackages()
		.add("@headlessui/vue", "^1.2.0")
		.addDev('autoprefixer', '^10')
		.addDev("postcss", "^8.1.14")
		.addDev("postcss-import", "^12.0.1")
		.addDev("tailwindcss", "^2.0.1")
		.addDev("@tailwindcss/forms", "^0.2.1")
		.addDev("@tailwindcss/typography", "^0.3.0")
}).withTitle('Installing Tailwind...')

// Inertia
Preset.group(preset => {
	preset.editNodePackages()
		.addDev("@inertiajs/inertia", "^0.8.4")
		.addDev("@inertiajs/inertia-vue3", "^0.3.5")
		.addDev("@inertiajs/progress", "^0.2.4")
}).withTitle('Installing Inertia JS...')

// PHP Packages
Preset.editPhpPackages()
	.add('innocenzi/laravel-vite', '^0.1.1')
	.add('spatie/laravel-medialibrary', '^9.6.2')
	.add("guzzlehttp/guzzle", "^7.0.1")
	.add("inertiajs/inertia-laravel", "^0.3.5")
	.add("laravel/jetstream", "^2.3")
	.add("laravel/sanctum", "^2.6")
	.add("sentry/sentry-laravel", "^2.4")
	.add("wildbit/swiftmailer-postmark", "^3.3")
	.add("tightenco/ziggy", "^1.0")
	.addDev("barryvdh/laravel-debugbar", "^3.5")
	.withTitle('Updating composer.json...');

Preset.installDependencies('php')
	.ifOption('install')
	.withTitle('Updating PHP dependencies...');

Preset.installDependencies('node')
	.ifOption('install')
	.withTitle('Updating Node dependencies...');

Preset.instruct([
	`Run the development server with ${color.magenta('yarn dev')}`,
	`Edit your scripts in ${color.magenta('resources/scripts')}`,
]).withHeading("What's next?")