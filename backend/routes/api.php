<?php

use App\Http\Controllers\Api\V1\Admin\BaksosController as AdminBaksosController;
use App\Http\Controllers\Api\V1\Admin\BannerController as AdminBannerController;
use App\Http\Controllers\Api\V1\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Api\V1\Admin\ContactMessageController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\EventController as AdminEventController;
use App\Http\Controllers\Api\V1\Admin\FaqController as AdminFaqController;
use App\Http\Controllers\Api\V1\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Api\V1\Admin\MemberController;
use App\Http\Controllers\Api\V1\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Api\V1\Admin\OrganizationController as AdminOrganizationController;
use App\Http\Controllers\Api\V1\Admin\SettingController as AdminSettingController;
use App\Http\Controllers\Api\V1\Admin\SponsorController as AdminSponsorController;
use App\Http\Controllers\Api\V1\Admin\TouringController as AdminTouringController;
use App\Http\Controllers\Api\V1\Admin\UserController;
use App\Http\Controllers\Api\V1\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\Api\V1\Auth\AuthController;
use App\Http\Controllers\Api\V1\Public\BannerController;
use App\Http\Controllers\Api\V1\Public\BaksosController;
use App\Http\Controllers\Api\V1\Public\CategoryController;
use App\Http\Controllers\Api\V1\Public\ContactController;
use App\Http\Controllers\Api\V1\Public\EventController;
use App\Http\Controllers\Api\V1\Public\FaqController;
use App\Http\Controllers\Api\V1\Public\GalleryController;
use App\Http\Controllers\Api\V1\Public\NewsController;
use App\Http\Controllers\Api\V1\Public\OrganizationController;
use App\Http\Controllers\Api\V1\Public\SettingController;
use App\Http\Controllers\Api\V1\Public\SponsorController;
use App\Http\Controllers\Api\V1\Public\StatsController;
use App\Http\Controllers\Api\V1\Public\TouringController;
use App\Http\Controllers\Api\V1\Public\VideoController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        Route::get('/auth/me', [AuthController::class, 'me']);
    });

    // Public (website)
    Route::get('/tourings', [TouringController::class, 'index']);
    Route::get('/tourings/{slug}', [TouringController::class, 'show']);

    Route::get('/baksos', [BaksosController::class, 'index']);
    Route::get('/baksos/{slug}', [BaksosController::class, 'show']);

    Route::get('/categories', [CategoryController::class, 'index']);

    Route::get('/gallery/albums', [GalleryController::class, 'index']);
    Route::get('/gallery/albums/{slug}', [GalleryController::class, 'show']);

    Route::get('/videos', [VideoController::class, 'index']);
    Route::get('/videos/{id}', [VideoController::class, 'show']);

    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{slug}', [NewsController::class, 'show']);

    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{slug}', [EventController::class, 'show']);
    Route::post('/events/{slug}/register', [EventController::class, 'register']);

    Route::get('/sponsors', [SponsorController::class, 'index']);
    Route::get('/faqs', [FaqController::class, 'index']);
    Route::get('/banners', [BannerController::class, 'index']);
    Route::get('/organization-members', [OrganizationController::class, 'index']);
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/stats', [StatsController::class, 'index']);
    Route::post('/contact', [ContactController::class, 'store']);

    // Admin dashboard
    Route::prefix('admin')->middleware(['auth:sanctum'])->group(function () {
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

        Route::middleware('role:admin,pengurus')->group(function () {
            Route::apiResource('members', MemberController::class);
            Route::apiResource('tourings', AdminTouringController::class);
            Route::apiResource('baksos', AdminBaksosController::class)
                ->parameters(['baksos' => 'baksos']);

            Route::apiResource('gallery/albums', AdminGalleryController::class)
                ->parameters(['albums' => 'album']);
            Route::post('gallery/albums/{album}/photos', [AdminGalleryController::class, 'storePhotos']);
            Route::delete('gallery/albums/{album}/photos/{photo}', [AdminGalleryController::class, 'destroyPhoto']);

            Route::apiResource('videos', AdminVideoController::class);
            Route::apiResource('categories', AdminCategoryController::class)->only(['index', 'store', 'update', 'destroy']);
            Route::apiResource('news', AdminNewsController::class);

            Route::apiResource('events', AdminEventController::class);
            Route::get('events/{event}/registrations', [AdminEventController::class, 'registrations']);

            Route::apiResource('sponsors', AdminSponsorController::class)->except(['show']);
            Route::apiResource('faqs', AdminFaqController::class)->except(['show']);
            Route::apiResource('banners', AdminBannerController::class)->except(['show']);
            Route::apiResource('organization-members', AdminOrganizationController::class)
                ->parameters(['organization-members' => 'organizationMember'])
                ->except(['show']);

            Route::apiResource('contact-messages', ContactMessageController::class)
                ->parameters(['contact-messages' => 'contactMessage'])
                ->only(['index', 'show', 'destroy']);
        });

        Route::middleware('role:admin')->group(function () {
            Route::apiResource('users', UserController::class);
            Route::get('/settings', [AdminSettingController::class, 'index']);
            Route::put('/settings', [AdminSettingController::class, 'update']);
        });
    });
});
