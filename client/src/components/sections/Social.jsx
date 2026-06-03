import { Camera, ExternalLink, Video } from 'lucide-react'
import FadeUp from '../ui/FadeUp'

const instagramPosts = [
  'https://www.instagram.com/p/DX4XtK3Iaqy/',
  'https://www.instagram.com/p/DYASFy9CXq8/',
  'https://www.instagram.com/p/DYKqwnOCd8R/',
  'https://www.instagram.com/p/DXuEgZUI0Bi/',
  'https://www.instagram.com/p/DYUqxnki_jE/',
  'https://www.instagram.com/p/DXPclqBgnbB/',
  'https://www.instagram.com/p/DXKVUwwgtYZ/',
  'https://www.instagram.com/p/DWrFy0Ikn-l/',
  'https://www.instagram.com/p/DWl8HBQgkHH/',
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
  return `${postUrl}embed/captioned/`
}

function youtubeEmbedUrl(shortUrl) {
  const videoId = shortUrl.split('/shorts/')[1]?.split('?')[0]
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1`
}

export default function Social() {
  return (
    <section id="social" className="scroll-mt-28 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="text-center">
          <p className="eyebrow">Community</p>
          <h2 className="section-title mx-auto mt-4 max-w-2xl text-ink">Follow the journey</h2>
        </FadeUp>

        <FadeUp stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <article className="fade-up group rounded-2xl border border-border bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="rounded-[calc(1rem-2px)] bg-gradient-to-br from-pink-400 via-purple-400 to-amber-300 p-[1px]">
              <div className="rounded-[calc(1rem-3px)] bg-white p-6">
                <div className="flex items-center gap-2 text-pink-600">
                  <Camera className="h-6 w-6" aria-hidden />
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider">Instagram</span>
                </div>
                <p className="mt-3 font-display text-xl font-semibold text-ink">@nutrishita</p>
                <p className="mt-2 text-sm text-sage-700">Follow for daily nutrition tips and short video previews</p>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {instagramPosts.map((postUrl, i) => (
                    <div key={postUrl} className="group/item overflow-hidden rounded-xl border border-border bg-sage-50 shadow-inner">
                      <div className="relative aspect-[4/5] bg-black">
                        <iframe
                          src={instagramEmbedUrl(postUrl)}
                          title={`Instagram post ${i + 1}`}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                      <a
                        href={postUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-2 border-t border-border/70 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-sage-700 transition hover:text-ink"
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

          <article className="fade-up group rounded-2xl border border-border bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-2 text-red-600">
              <Video className="h-7 w-7" aria-hidden />
              <span className="font-sans text-xs font-semibold uppercase tracking-wider">YouTube</span>
            </div>
            <p className="mt-3 font-display text-xl font-semibold text-ink">Nutrishita by Akshita</p>
            <p className="mt-2 text-sm text-sage-700">Watch free nutrition guides and short-form video clips</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {youtubeShorts.map((shortUrl, i) => {
                return (
                  <div key={`${shortUrl}-${i}`} className="overflow-hidden rounded-xl border border-border bg-sage-50 shadow-inner">
                    <div className="relative aspect-[9/16] bg-black">
                      <iframe
                        src={youtubeEmbedUrl(shortUrl)}
                        title={`YouTube short ${i + 1}`}
                        className="absolute inset-0 h-full w-full"
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
