<?php

namespace App\Providers;

use App\Repositories\Contracts\BaksosRepositoryInterface;
use App\Repositories\Contracts\BannerRepositoryInterface;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\ContactMessageRepositoryInterface;
use App\Repositories\Contracts\EventRegistrationRepositoryInterface;
use App\Repositories\Contracts\EventRepositoryInterface;
use App\Repositories\Contracts\FaqRepositoryInterface;
use App\Repositories\Contracts\GalleryAlbumRepositoryInterface;
use App\Repositories\Contracts\GalleryPhotoRepositoryInterface;
use App\Repositories\Contracts\MemberRepositoryInterface;
use App\Repositories\Contracts\NewsRepositoryInterface;
use App\Repositories\Contracts\OrganizationMemberRepositoryInterface;
use App\Repositories\Contracts\SettingRepositoryInterface;
use App\Repositories\Contracts\SponsorRepositoryInterface;
use App\Repositories\Contracts\TagRepositoryInterface;
use App\Repositories\Contracts\TouringRepositoryInterface;
use App\Repositories\Contracts\UserRepositoryInterface;
use App\Repositories\Contracts\VideoRepositoryInterface;
use App\Repositories\Eloquent\BaksosRepository;
use App\Repositories\Eloquent\BannerRepository;
use App\Repositories\Eloquent\CategoryRepository;
use App\Repositories\Eloquent\ContactMessageRepository;
use App\Repositories\Eloquent\EventRegistrationRepository;
use App\Repositories\Eloquent\EventRepository;
use App\Repositories\Eloquent\FaqRepository;
use App\Repositories\Eloquent\GalleryAlbumRepository;
use App\Repositories\Eloquent\GalleryPhotoRepository;
use App\Repositories\Eloquent\MemberRepository;
use App\Repositories\Eloquent\NewsRepository;
use App\Repositories\Eloquent\OrganizationMemberRepository;
use App\Repositories\Eloquent\SettingRepository;
use App\Repositories\Eloquent\SponsorRepository;
use App\Repositories\Eloquent\TagRepository;
use App\Repositories\Eloquent\TouringRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Eloquent\VideoRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * @var array<class-string, class-string>
     */
    public array $bindings = [
        UserRepositoryInterface::class => UserRepository::class,
        MemberRepositoryInterface::class => MemberRepository::class,
        CategoryRepositoryInterface::class => CategoryRepository::class,
        TouringRepositoryInterface::class => TouringRepository::class,
        BaksosRepositoryInterface::class => BaksosRepository::class,
        GalleryAlbumRepositoryInterface::class => GalleryAlbumRepository::class,
        GalleryPhotoRepositoryInterface::class => GalleryPhotoRepository::class,
        VideoRepositoryInterface::class => VideoRepository::class,
        TagRepositoryInterface::class => TagRepository::class,
        NewsRepositoryInterface::class => NewsRepository::class,
        EventRepositoryInterface::class => EventRepository::class,
        EventRegistrationRepositoryInterface::class => EventRegistrationRepository::class,
        SponsorRepositoryInterface::class => SponsorRepository::class,
        FaqRepositoryInterface::class => FaqRepository::class,
        BannerRepositoryInterface::class => BannerRepository::class,
        ContactMessageRepositoryInterface::class => ContactMessageRepository::class,
        OrganizationMemberRepositoryInterface::class => OrganizationMemberRepository::class,
        SettingRepositoryInterface::class => SettingRepository::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
