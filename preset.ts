import { Preset, color } from 'apply';

Preset.setName('laravel-preset');
Preset.option('install', false);
Preset.option('delete', false);

Preset.extract('default');

// Deleting Files
Preset.delete(['/resources/js', 'resources/views/welcome.blade.php', 'webpack.mix.js'])
	.ifOption('delete')
	.withTitle('Deleting Unneeded Files');

// Updating Gitignore File
Preset.group(preset => {
	preset.edit('.gitignore')
		.withTitle(`Updating Gitignore...`)
		.addBefore('/public/hot', '/public/build'); 

	preset.edit('.gitignore')
		.addAfter('/public/hot', '/public/mix-manifest.json');
}).withTitle('Updating Gitignore File');

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
	preset.edit('routes/web.php')
		.update((content) => content.replace('welcome', 'app'));
		
	preset.editNodePackages()
		.add('vue', '^3.0.5')
		.addDev('@vue/compiler-sfc', '^3.0.5')
		.addDev('@vitejs/plugin-vue', '^1.1.4')
		.addDev('@vitejs/plugin-legacy', '^1.4');

}).withTitle('Installing Vue...');

// Tailwind CSS
Preset.group(preset => {
	preset.editNodePackages()
		.addDev("@headlessui/vue", "^1.2.0")
		.addDev('autoprefixer', '^10')
		.addDev("cssnano", "^5.0.6")
		.addDev("postcss", "^8.3.5")
		.addDev("postcss-load-config", "^3.1.0")
		.addDev("tailwindcss", "^2.2.2")
		.addDev("@tailwindcss/aspect-ratio", "0.2.1")
		.addDev("@tailwindcss/forms", "^0.2.1")
		.addDev("@tailwindcss/typography", "^0.3.0");

}).withTitle('Installing Tailwind...');

// Inertia
Preset.group(preset => {
	preset.editNodePackages()
		.addDev("@inertiajs/inertia", "^0.9.0")
		.addDev("@inertiajs/inertia-vue3", "^0.4.7")
		.addDev("@inertiajs/progress", "^0.2.4")
		.addDev('@babel/plugin-syntax-dynamic-import', "^7.8.3");
}).withTitle('Installing Inertia JS...');

// PHP Packages
Preset.editPhpPackages()
	.add('innocenzi/laravel-vite', '^0.1.1')
	.add('spatie/laravel-medialibrary', '^9.6.2')
	.add("guzzlehttp/guzzle", "^7.0.1")
	.add("inertiajs/inertia-laravel", "^0.4.2")
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


Preset.group(preset => {

	preset.edit('routes/web.php')
	.withoutTitle()
	.addBefore('Route::', [
		`Route::get('/', [HomeController::class, 'index']);\n`
	]);

	preset.edit('routes/web.php')
	.withoutTitle()
	.addBefore('use', [
		`use App\\Http\\Controllers\\HomeController;\n`
	]);
});


Preset.instruct([
	`Set Proxy in vite.config.js for dev server`,
	`Run the development server with ${color.magenta('yarn dev')}`,
	`To build assets use ${color.magenta('yarn build')}`,
	`Edit your scripts in ${color.magenta('resources/scripts')}`,
]).withHeading("What's next?");



