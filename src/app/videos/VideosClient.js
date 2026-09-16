// app/videos/VideosClient.js
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef, useMemo } from 'react';

import {
  FaPlay,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaVideo,
  FaExternalLinkAlt,
} from 'react-icons/fa';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

/* =========================================================
   CONSTANTS
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const BRAND = '#CC1D34';

const DESKTOP_VIDEOS_PER_PAGE = 10;
const MOBILE_VIDEOS_PER_PAGE = 4;

/* =========================================================
   PROFESSIONAL FONT PAIRING
   - Fraunces  → editorial serif, used for headings
   - Plus Jakarta Sans → clean geometric sans, used for body/UI
========================================================= */

const FONT_HEADING = "  serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

/* =========================================================
   ANIMATIONS
========================================================= */

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   VIDEO HELPERS
========================================================= */

const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const isPortraitVideo = (video) => {
  if (!video) return false;
  if (video.orientation) return video.orientation === 'portrait';

  const url = (video.embedUrl || '').toLowerCase();

  if (video.sourceType === 'instagram') return true;
  if (video.sourceType === 'youtube' && url.includes('/shorts/'))
    return true;
  if (
    video.sourceType === 'facebook' &&
    (url.includes('/reel/') || url.includes('/reels/'))
  )
    return true;

  return false;
};

const buildFacebookUrl = (
  url,
  { width = 400, autoplay = false } = {}
) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=${Math.round(width)}&autoplay=${autoplay}` +
  `&mute=1&allowfullscreen=true`;

const getEmbedUrl = (
  url,
  sourceType,
  portrait = false,
  fbWidth = 400
) => {
  if (!url) return '';

  if (sourceType === 'youtube') {
    const id = getYouTubeVideoId(url);
    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`
      : '';
  }

  if (sourceType === 'facebook') {
    return buildFacebookUrl(url, { width: fbWidth, autoplay: true });
  }

  if (sourceType === 'instagram') {
    const clean = url.replace(/\/+$/, '').split('?')[0];
    return `${clean}/embed`;
  }

  return '';
};

const getYouTubeThumbnail = (url) => {
  const id = getYouTubeVideoId(url);
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

/* =========================================================
   RESPONSIVE HOOK
========================================================= */

function useVideosPerPage() {
  const [perPage, setPerPage] = useState(DESKTOP_VIDEOS_PER_PAGE);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(min-width: 640px)');
    const update = () => {
      setPerPage(
        mq.matches ? DESKTOP_VIDEOS_PER_PAGE : MOBILE_VIDEOS_PER_PAGE
      );
    };

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return perPage;
}

/* =========================================================
   LIVE SESSION CARD
========================================================= */

function LiveSessionCard({ session, index = 0 }) {
  const date = new Date(session.scheduledAt);
  const isUpcoming = date.getTime() > Date.now();

  return (
    <motion.div
      variants={scaleFade}
      custom={index}
      className="
        group relative flex items-center gap-3
        p-3 sm:p-4
        rounded-[14px] sm:rounded-[18px]
        border border-white/80
        bg-white/75 backdrop-blur-md
        shadow-[0_8px_30px_rgba(70,62,55,0.06)]
        hover:-translate-y-0.5
        hover:bg-white/90
        hover:shadow-[0_12px_35px_rgba(70,62,55,0.10)]
        transition-all duration-300
      "
    >
      <div
        className="
          flex items-center justify-center
          w-12 h-12 sm:w-16 sm:h-16
          shrink-0
          rounded-[12px] sm:rounded-[16px]
          text-white
          shadow-[0_4px_12px_-4px_rgba(204,29,52,0.5)]
        "
        style={{ backgroundColor: BRAND }}
      >
        <div className="text-center leading-none">
          <div
            className="text-base sm:text-xl font-bold"
            style={{ fontFamily: FONT_HEADING }}
          >
            {date.getDate()}
          </div>
          <div
            className="text-[8px] sm:text-[10px] uppercase font-semibold tracking-wider mt-0.5"
            style={{ fontFamily: FONT_BODY }}
          >
            {date.toLocaleString('en-US', { month: 'short' })}
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="font-medium text-[#263b32] truncate text-[12px] sm:text-[15px] tracking-[-0.01em]"
            style={{ fontFamily: FONT_HEADING }}
          >
            {session.title || 'Untitled Session'}
          </h3>
          {isUpcoming && (
            <span
              className="
                text-[7px] sm:text-[8px]
                font-bold uppercase tracking-wider
                px-1.5 py-0.5
                rounded-full
                text-white shrink-0
              "
              style={{
                backgroundColor: BRAND,
                fontFamily: FONT_BODY,
              }}
            >
              Upcoming
            </span>
          )}
        </div>

        <div
          className="
            flex flex-wrap items-center
            gap-x-3 gap-y-1
            text-[9px] sm:text-[11px]
            text-[#687169] mt-1
            tracking-[0.01em]
          "
          style={{ fontFamily: FONT_BODY }}
        >
          <span className="flex items-center gap-1">
            <FaClock className="text-[7px] sm:text-[9px]" />
            {date.toLocaleString()}
          </span>
        </div>
      </div>

      {session.link && (
        <a
          href={session.link}
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex items-center gap-1.5
            px-3 py-1.5 sm:px-4 sm:py-2
            rounded-full
            text-white
            text-[7px] sm:text-[9px]
            font-semibold uppercase tracking-[0.12em]
            whitespace-nowrap shrink-0
            shadow-[0_4px_12px_-4px_rgba(204,29,52,0.5)]
            hover:opacity-90
            transition-opacity
          "
          style={{
            backgroundColor: BRAND,
            fontFamily: FONT_BODY,
          }}
        >
          <FaExternalLinkAlt className="text-[7px] sm:text-[8px]" />
          Join
        </a>
      )}
    </motion.div>
  );
}

/* =========================================================
   VIDEO PREVIEW CARD
========================================================= */

function VideoPreviewCard({ video, onOpen, index = 0 }) {
  const cardRef = useRef(null);
  const [isNear, setIsNear] = useState(false);

  const isYouTube =
    video.sourceType === 'youtube' && !!video.embedUrl;
  const isFacebook =
    video.sourceType === 'facebook' && !!video.embedUrl;

  const thumbUrl = isYouTube
    ? getYouTubeThumbnail(video.embedUrl)
    : video.thumbnailUrl || video.thumbnail || '';

  useEffect(() => {
    if (!isFacebook || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsNear(true);
      },
      { rootMargin: '300px' }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isFacebook]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="
        group relative w-full aspect-[9/16] cursor-pointer
        rounded-[16px] sm:rounded-[20px] overflow-hidden
        bg-[#0f1210]
        ring-1 ring-black/5
        shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.15)]
        hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_16px_40px_-12px_rgba(0,0,0,0.25)]
        transition-shadow duration-300
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#8B9D83]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#f7f4ef]
      "
    >
      {video.sourceType === 'upload' && video.videoUrl && (
        <video
          src={`${video.videoUrl}#t=0.1`}
          poster={video.thumbnailUrl || video.thumbnail || undefined}
          className="w-full h-full object-contain bg-black"
          muted
          playsInline
          preload="metadata"
        />
      )}

      {isYouTube && (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="
                absolute inset-0 w-full h-full object-cover bg-black
                transition-transform duration-700 group-hover:scale-[1.04]
              "
              onError={(e) => {
                const id = getYouTubeVideoId(video.embedUrl);
                if (id && !e.target.dataset.fallback) {
                  e.target.dataset.fallback = '1';
                  e.target.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
                }
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-black" />
          )}
        </>
      )}

      {isFacebook && (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="absolute inset-0 w-full h-full object-cover bg-black"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83] to-[#6b7d63]" />
          )}

          {isNear && (
            <iframe
              src={buildFacebookUrl(video.embedUrl, {
                width: 420,
                autoplay: false,
              })}
              title={video.title || 'Video'}
              loading="lazy"
              scrolling="no"
              frameBorder="0"
              className="absolute inset-0 w-full h-full pointer-events-none"
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          )}
        </>
      )}

      {!video.sourceType ||
      (!isYouTube && !isFacebook && video.sourceType !== 'upload') ? (
        <>
          {thumbUrl ? (
            <img
              src={thumbUrl}
              alt={video.title || 'Video'}
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#8B9D83] to-[#6b7d63]" />
          )}
        </>
      ) : null}

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-black/5 to-black/10" />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          aria-label="Play video"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.94 }}
          className="
            w-10 h-10 sm:w-11 sm:h-11
            rounded-full
            bg-white/95 backdrop-blur-sm
            flex items-center justify-center
            shadow-lg ring-1 ring-black/5
            opacity-90 group-hover:opacity-100
            transition-all duration-200
            focus:outline-none
            focus-visible:ring-2 focus-visible:ring-white
          "
        >
          <FaPlay
            className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5"
            style={{ color: BRAND }}
          />
        </motion.button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-left pointer-events-none">
        <span
          className="
            inline-block
            text-[7px] sm:text-[9px]
            uppercase tracking-[0.1em] font-semibold
            mb-1 px-1.5 py-0.5 rounded
            text-white
          "
          style={{
            backgroundColor: `${BRAND}CC`,
            fontFamily: FONT_BODY,
          }}
        >
          {video.type}
        </span>

        {video.title && (
          <p
            className="
              text-[10px] sm:text-[13px] font-medium text-white
              leading-snug line-clamp-2 tracking-[-0.005em]
              drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]
            "
            style={{ fontFamily: FONT_BODY }}
          >
            {video.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function VideosClient() {
  const [videos, setVideos] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [activeVideo, setActiveVideo] = useState(null);
  const [portraitOverride, setPortraitOverride] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeType, setActiveType] = useState('all');

  const videosPerPage = useVideosPerPage();

  const fbContainerRef = useRef(null);
  const [fbWidth, setFbWidth] = useState(400);

  useEffect(() => {
    let cancelled = false;

    const fetchVideos = async () => {
      try {
        setIsLoadingVideos(true);
        const response = await fetch(`${API_URL}/api/videos`);
        if (!response.ok) {
          throw new Error(`Videos fetch failed: ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled && data.success && Array.isArray(data.data)) {
          setVideos(data.data);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
        if (!cancelled) setErrorMsg((prev) => prev || error.message);
      } finally {
        if (!cancelled) setIsLoadingVideos(false);
      }
    };

    fetchVideos();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchLiveSessions = async () => {
      try {
        setIsLoadingLive(true);
        const response = await fetch(
          `${API_URL}/api/videos/live-sessions`
        );
        if (!response.ok) {
          throw new Error(
            `Live sessions fetch failed: ${response.status}`
          );
        }
        const data = await response.json();
        if (!cancelled && data.success && Array.isArray(data.data)) {
          setLiveSessions(data.data);
        }
      } catch (error) {
        console.error('Error fetching live sessions:', error);
      } finally {
        if (!cancelled) setIsLoadingLive(false);
      }
    };

    fetchLiveSessions();
    return () => {
      cancelled = true;
    };
  }, []);

  const upcomingSessions = useMemo(() => {
    return [...liveSessions].sort(
      (a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt)
    );
  }, [liveSessions]);

  const videoTypes = useMemo(() => {
    const types = videos
      .map((v) => (v.type || '').trim().toLowerCase())
      .filter(Boolean);
    const unique = Array.from(new Set(types));
    unique.sort((a, b) => a.localeCompare(b));
    return unique;
  }, [videos]);

  useEffect(() => {
    if (activeType === 'all') return;
    if (!videoTypes.includes(activeType)) {
      setActiveType('all');
    }
  }, [videoTypes, activeType]);

  const filteredVideos = useMemo(() => {
    if (activeType === 'all') return videos;
    return videos.filter(
      (v) => (v.type || '').trim().toLowerCase() === activeType
    );
  }, [videos, activeType]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredVideos.length / videosPerPage)
  );

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * videosPerPage;
    return filteredVideos.slice(start, start + videosPerPage);
  }, [filteredVideos, currentPage, videosPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeType, filteredVideos.length, videosPerPage]);

  const openVideo = (video) => {
    setPortraitOverride(null);
    if (typeof window !== 'undefined') {
      setFbWidth(Math.round(Math.min(window.innerWidth * 0.92, 520)));
    }
    setActiveVideo(video);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = activeVideo ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    if (activeVideo) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeVideo]);

  const isUploadModal =
    activeVideo &&
    activeVideo.sourceType === 'upload' &&
    activeVideo.videoUrl;

  const isFacebookModal =
    activeVideo && activeVideo.sourceType === 'facebook';

  useEffect(() => {
    if (!isFacebookModal || !fbContainerRef.current) return;

    const el = fbContainerRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        if (w > 0 && w !== fbWidth) setFbWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isFacebookModal, activeVideo, fbWidth]);

  const portrait =
    portraitOverride !== null
      ? portraitOverride
      : isPortraitVideo(activeVideo);

  const embedBoxClass = portrait
    ? 'h-[80vh] max-h-[80vh] aspect-[9/16] max-w-[90vw]'
    : 'w-[min(90vw,900px)] aspect-video max-h-[80vh]';

  const filterOptions = ['all', ...videoTypes];

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />

      <Navbar />

      <main className="relative overflow-hidden bg-[#f7f4ef]">
        {/* ==================================================
            HERO HEADER
        ================================================== */}
        <section className="relative px-3 pb-6 pt-10 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8 -mt-24">
          <div className="pointer-events-none absolute left-[-180px] top-[100px] h-[400px] w-[400px] rounded-full bg-[#d7dfd2]/30 blur-[100px]" />
          <div className="pointer-events-none absolute right-[-160px] top-[-80px] h-[450px] w-[450px] rounded-full bg-[#e7d9d0]/30 blur-[100px]" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 mx-auto max-w-[900px] text-center"
          >
          

            <h1
              className="text-[34px] font-light leading-[1.02] tracking-[-0.035em] text-[#29362f] sm:text-[58px] md:text-[50px]"
              style={{ fontFamily: FONT_HEADING }}
            >
              Videos &amp;{' '}
              <span
                className=""
                style={{ color: '#CC1D34' }}
              >
                Live Sessions
              </span>
            </h1>

           

          
          </motion.div>
        </section>

        {/* ==================================================
            LIVE SESSIONS
        ================================================== */}
        <section className="relative px-3 pb-8 sm:px-6 sm:pb-12 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mb-4 sm:mb-6"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full"
                    style={{ backgroundColor: BRAND }}
                  />
                </span>
                <span
                  className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#7e897e] sm:text-[10px] sm:tracking-[0.38em]"
                  style={{ fontFamily: FONT_BODY }}
                >
                  Live Session Schedule
                </span>
              </div>

              <h2
                className="mt-2 max-w-[600px] text-[24px] font-light leading-[1.1] tracking-[-0.03em] text-[#303b34] sm:text-[38px]"
                style={{ fontFamily: FONT_HEADING }}
              >
                Upcoming{' '}
                <span className="italic text-[#CC1D34]">
                  live sessions
                </span>
              </h2>
            </motion.div>

            {isLoadingLive ? (
              <div className="flex justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-[#879681] border-t-transparent" />
              </div>
            ) : upcomingSessions.length === 0 ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="
                  flex items-center gap-3
                  p-4 sm:p-5
                  rounded-[14px] sm:rounded-[18px]
                  border border-dashed border-[#c5d5be]
                  bg-white/60 backdrop-blur-md
                "
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf1ea] text-[#748571] sm:h-12 sm:w-12">
                  <FaCalendarAlt className="text-sm sm:text-base" />
                </div>
                <div>
                  <p
                    className="text-[12px] font-medium text-[#59635c] sm:text-sm"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    No live sessions scheduled yet
                  </p>
                  <p
                    className="mt-0.5 text-[10px] text-[#8a938a] sm:text-[11px]"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Check back soon — new sessions are added regularly.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="grid grid-cols-1 gap-2 sm:gap-3 lg:grid-cols-2"
              >
                {upcomingSessions.map((session, i) => (
                  <LiveSessionCard
                    key={session._id || i}
                    session={session}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ==================================================
            VIDEOS SECTION
        ================================================== */}
        <section className="relative px-3 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className="mb-5 sm:mb-8"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="h-px w-6 bg-[#a9afa5] sm:w-8" />
                <span
                  className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#7e897e] sm:text-[10px] sm:tracking-[0.38em]"
                  style={{ fontFamily: FONT_BODY }}
                >
                  Video Library
                </span>
              </div>

              <h2
                className="mt-2 max-w-[600px] text-[24px] font-light leading-[1.1] tracking-[-0.03em] text-[#303b34] sm:text-[38px]"
                style={{ fontFamily: FONT_HEADING }}
              >
                Watch our{' '}
                <span className="italic text-[#CC1D34]">collection</span>
              </h2>
            </motion.div>

            {filterOptions.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6 sm:mb-8 -mx-3 px-3 sm:mx-0 sm:px-0"
              >
                <div className="flex sm:justify-start overflow-x-auto no-scrollbar">
                  <div
                    className="
                      inline-flex items-center gap-1
                      p-1 rounded-full
                      bg-white/80 backdrop-blur
                      border border-black/5
                      shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_-4px_rgba(0,0,0,0.08)]
                      shrink-0
                    "
                  >
                    {filterOptions.map((type) => {
                      const isActive = type === activeType;
                      const label =
                        type === 'all' ? 'All Videos' : type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setActiveType(type)}
                          aria-pressed={isActive}
                          className={`
                            relative
                            px-3.5 sm:px-5
                            py-1.5 sm:py-2
                            rounded-full
                            text-[10px] sm:text-[11px]
                            font-semibold
                            uppercase
                            tracking-[0.1em]
                            whitespace-nowrap
                            transition-colors duration-200
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#8B9D83]
                            ${
                              isActive
                                ? 'text-white'
                                : 'text-[#263b32]/70 hover:text-[#263b32]'
                            }
                          `}
                          style={{ fontFamily: FONT_BODY }}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="activeVideoTypePill"
                              className="absolute inset-0 rounded-full shadow-[0_2px_8px_-2px_rgba(82,102,90,0.5)]"
                              style={{ backgroundColor: '#A7232E' }}
                              transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 32,
                              }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            {type === 'all' && (
                              <FaStar
                                className="w-2.5 h-2.5"
                                fill={
                                  isActive ? 'currentColor' : 'none'
                                }
                              />
                            )}
                            {label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {isLoadingVideos ? (
              <div className="flex justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#879681] border-t-transparent" />
              </div>
            ) : paginatedVideos.length > 0 ? (
              <motion.div
                layout
                className="
                  grid grid-cols-2 sm:grid-cols-3
                  md:grid-cols-4 lg:grid-cols-5
                  gap-3 sm:gap-4
                "
              >
                <AnimatePresence mode="popLayout">
                  {paginatedVideos.map((video, i) => (
                    <VideoPreviewCard
                      key={video._id}
                      video={video}
                      index={i}
                      onOpen={() => openVideo(video)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf1ea] text-[#748571] mb-3">
                  <FaVideo className="text-base" />
                </div>
                <p
                  className="text-[12px] text-[#687169] sm:text-sm"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {errorMsg
                    ? 'Unable to load videos right now. Please try again later.'
                    : 'No videos in this category yet.'}
                </p>
              </motion.div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3 sm:mt-10">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="
                    w-10 h-10 flex items-center justify-center
                    rounded-full bg-white ring-1 ring-black/5
                    text-[#263b32]
                    shadow-[0_1px_2px_rgba(0,0,0,0.04)]
                    hover:bg-[#f0f5ed]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    disabled:hover:bg-white
                    transition-all duration-200
                  "
                >
                  <FaChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(totalPages, p + 1)
                    )
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="
                    w-10 h-10 flex items-center justify-center
                    rounded-full text-white
                    shadow-[0_2px_8px_-2px_rgba(204,29,52,0.5)]
                    disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-200
                  "
                  style={{ backgroundColor: BRAND }}
                >
                  <FaChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </section>

      

        {/* ==================================================
            VIDEO MODAL
        ================================================== */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="
                fixed inset-0 z-[9999]
                flex items-center justify-center
                p-4
                bg-[#18221d]/85 backdrop-blur-md
              "
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="
                  relative flex flex-col items-center
                  max-w-[90vw] max-h-[90vh]
                "
              >
                <div className="absolute -top-12 right-0 flex items-center gap-1">
                  {!isUploadModal && !isFacebookModal && (
                    <button
                      onClick={() =>
                        setPortraitOverride(!portrait)
                      }
                      className="
                        p-2 text-white/80 hover:text-white
                        transition-colors
                      "
                      aria-label={
                        portrait
                          ? 'Switch to landscape'
                          : 'Switch to portrait'
                      }
                    >
                      <span className="text-lg">
                        {portrait ? '▭' : '▯'}
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => setActiveVideo(null)}
                    className="
                      p-2 text-white/80 hover:text-white
                      transition-colors text-2xl leading-none
                    "
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div
                  className="
                    relative z-10
                    bg-black rounded-2xl overflow-hidden
                    shadow-2xl flex items-center justify-center
                  "
                >
                  {isUploadModal ? (
                    <video
                      src={activeVideo.videoUrl}
                      className="
                        max-w-[90vw] max-h-[80vh]
                        w-auto h-auto
                      "
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : isFacebookModal ? (
                    <div
                      ref={fbContainerRef}
                      style={{
                        width: `${fbWidth}px`,
                        height: `${Math.round(
                          fbWidth * (portrait ? 1.6 : 0.5625)
                        )}px`,
                        maxWidth: '92vw',
                        maxHeight: '80vh',
                      }}
                    >
                      <iframe
                        key={`${activeVideo._id}-${
                          portrait ? 'p' : 'l'
                        }-${fbWidth}-modal`}
                        src={getEmbedUrl(
                          activeVideo.embedUrl,
                          activeVideo.sourceType,
                          portrait,
                          fbWidth
                        )}
                        className="w-full h-full"
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; fullscreen"
                        allowFullScreen
                        style={{
                          pointerEvents: 'auto',
                          touchAction: 'auto',
                        }}
                      />
                    </div>
                  ) : (
                    <div className={embedBoxClass}>
                      <iframe
                        key={`${activeVideo._id}-${
                          portrait ? 'p' : 'l'
                        }-modal`}
                        src={getEmbedUrl(
                          activeVideo.embedUrl,
                          activeVideo.sourceType,
                          portrait,
                          fbWidth
                        )}
                        className="w-full h-full"
                        scrolling="no"
                        frameBorder="0"
                        allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; fullscreen"
                        allowFullScreen
                        style={{
                          pointerEvents: 'auto',
                          touchAction: 'auto',
                        }}
                      />
                    </div>
                  )}
                </div>

                {activeVideo.title && (
                  <p
                    className="
                      mt-3 text-center text-white
                      text-sm md:text-base font-medium
                      max-w-md truncate
                    "
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {activeVideo.title}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}