import { Camera, ExternalLink, Play, Video } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const instagramPosts = [
  { url: 'https://www.instagram.com/p/DX4XtK3Iaqy/', title: 'Daily nutrition reel', tone: 'from-rose-100 via-white to-amber-100' },
  { url: 'https://www.instagram.com/p/DYASFy9CXq8/', title: 'Food habit tip', tone: 'from-emerald-100 via-white to-lime-100' },
  { url: 'https://www.instagram.com/p/DYKqwnOCd8R/', title: 'Diet decode', tone: 'from-sky-100 via-white to-teal-100' },
  { url: 'https://www.instagram.com/p/DXuEgZUI0Bi/', title: 'Wellness check', tone: 'from-orange-100 via-white to-rose-100' },
  { url: 'https://www.instagram.com/p/DYUqxnki_jE/', title: 'Nutrition reminder', tone: 'from-fuchsia-100 via-white to-amber-100' },
  { url: 'https://www.instagram.com/p/DXPclqBgnbB/', title: 'Healthy swaps', tone: 'from-lime-100 via-white to-emerald-100' },
  { url: 'https://www.instagram.com/p/DXKVUwwgtYZ/', title: 'Plate balance', tone: 'from-stone-100 via-white to-yellow-100' },
  { url: 'https://www.instagram.com/p/DWrFy0Ikn-l/', title: 'Real food note', tone: 'from-cyan-100 via-white to-sage-100' },
  { url: 'https://www.instagram.com/p/DWl8HBQgkHH/', title: 'Desi diet decode', tone: 'from-pink-100 via-white to-orange-100' },
]

const youtubeShorts = [
  'https://youtube.com/shorts/qcl2XGeewwc',
  'https://youtube.com/shorts/6-tp9XwMO2Y',
  'https://youtube.com/shorts/MYlCHCzdgL0',
  'https://youtube.com/shorts/aokBsfMPTEc',
  'https://youtube.com/shorts/kzZ3S8Sx6q4',
  'https://youtube.com/shorts/qT3Dd-bGTmw',
  'https://youtube.com/shorts/Myc_V3eBTVI',
  'https://youtube.com/shorts/mBKlwWgxZ8I',
  'https://youtube.com/shorts/qcl2XGeewwc',
]

function instagramEmbedUrl(postUrl) {
  return `${postUrl}embed/`
}

function youtubeEmbedUrl(shortUrl) {
  const videoId = shortUrl.split('/shorts/')[1]?.split('?')[0]
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1`
}

function youtubeVideoId(shortUrl) {
  return shortUrl.split('/shorts/')[1]?.split('?')[0]
}

export default function Social() {
  return (
    <section id="social" className="scroll-mt-24 bg-white py-16 md:scroll-mt-28 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeUp className="text-center">
          <p className="eyebrow">Community</p>
          <h2 className="section-title mx-auto mt-4 max-w-2xl text-ink">Follow the journey</h2>
        </FadeUp>

        <FadeUp stagger className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="fade-up group rounded-2xl border border-border bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="rounded-[calc(1rem-2px)] bg-gradient-to-br from-pink-400 via-purple-400 to-amber-300 p-[1px]">
              <div className="rounded-[calc(1rem-3px)] bg-white p-4 sm:p-6">
                <div className="flex items-center gap-2 text-pink-600">
                  <Camera className="h-6 w-6" aria-hidden />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider">Instagram</span>
                </div>
                <p className="mt-3 font-display text-xl font-semibold text-ink">@nutrishita</p>
                <p className="mt-2 text-sm text-sage-700">Tap any reel card to watch it on Instagram</p>
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                  {instagramPosts.map((post, i) => (
                    <div
                      key={post.url}
                      className="group/item overflow-hidden rounded-xl border border-border bg-white shadow-inner transition duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-sage-100">
                        <div className={`absolute inset-0 bg-gradient-to-br ${post.tone} md:hidden`}>
                          <div className="absolute inset-x-3 top-3 flex items-center justify-between">
                            <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-pink-600 shadow-sm">
                              Reel {i + 1}
                            </span>
                            <Camera className="h-4 w-4 text-pink-600" aria-hidden />
                          </div>
                          <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/90 px-3 py-2 shadow-sm">
                            <p className="font-display text-sm font-semibold leading-tight text-ink">{post.title}</p>
                          </div>
                        </div>
                        <iframe
                          src={instagramEmbedUrl(post.url)}
                          title={`Instagram reel preview ${i + 1}`}
                          className="pointer-events-none absolute left-0 top-[-46px] hidden h-[calc(100%+92px)] w-full border-0 md:block"
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                        <div className="absolute inset-x-2 top-2 flex items-center justify-between">
                          <span className="hidden rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-pink-600 shadow-sm backdrop-blur md:inline-flex">
                            Reel {i + 1}
                          </span>
                        </div>
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${post.title} on Instagram`}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/35 text-white shadow-md backdrop-blur-sm transition group-hover/item:scale-105">
                            <Play className="ml-0.5 h-7 w-7 fill-current" aria-hidden />
                          </span>
                        </a>
                      </div>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 border-t border-border/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-sage-700 transition group-hover/item:text-ink"
                      >
                        Open on Instagram
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          <article className="fade-up group rounded-2xl border border-border bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 md:p-8">
            <div className="flex items-center gap-2 text-red-600">
              <Video className="h-7 w-7" aria-hidden />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">YouTube</span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold text-ink">Nutrishita by Akshita</p>
            <p className="mt-2 text-sm text-sage-700">Shorts play muted in a compact carousel</p>
            <div className="mt-6 flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:thin] sm:gap-4">
              {youtubeShorts.map((shortUrl, i) => {
                const videoId = youtubeVideoId(shortUrl)
                return (
                  <div
                    key={`${shortUrl}-${i}`}
                    className="w-[160px] shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-sage-50 shadow-inner sm:w-[210px]"
                  >
                    <div className="relative aspect-[9/16] bg-black">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 block sm:hidden"
                        aria-label={`Open YouTube short ${i + 1}`}
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/15">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md">
                            <Play className="ml-0.5 h-6 w-6 fill-current" aria-hidden />
                          </span>
                        </span>
                      </a>
                      <iframe
                        src={youtubeEmbedUrl(shortUrl)}
                        title={`YouTube short ${i + 1}`}
                        className="absolute inset-0 hidden h-full w-full sm:block"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-2 border-t border-border/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-sage-700 transition hover:text-ink"
                    >
                      Open on YouTube
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                )
              })}
            </div>
          </article>
        </FadeUp>
      </div>
    </section>
  )
}
