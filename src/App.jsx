import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CATEGORY_ORDER = [
  "旅遊",
  "行程基礎",
  "行程功能",
  "行程進階",
  "金錢",
  "文件",
  "3C電力",
  "配件",
  "衣物",
  "盥洗",
  "健康",
  "餐飲",
  "社群",
  "動物",
  "使用者頭像",
  "介面",
  "其他",
];

const ITEM_NAME_OVERRIDES = {
  ai_sparkles: "AI 靈感",
  chevron_down: "展開箭頭",
  chevron_up: "收合箭頭",
  link_copy: "複製連結",
  loading_spinner: "載入中",
  memo_note: "備忘錄",
  menu_list: "清單選單",
  search: "搜尋",
  share: "分享",
  time_afternoon: "下午",
  time_all_day: "全天",
  time_custom: "自訂時間",
  time_evening: "晚上",
  time_forenoon: "上午",
  time_morning: "清晨",
  time_noon: "中午",
  add_trip_wand: "新增行程",
  beach_umbrella_palm: "海灘渡假",
  checkmark_circle: "完成勾選",
  chevron_left: "向左箭頭",
  chevron_right: "向右箭頭",
  clock: "時鐘",
  download_to_tray: "下載",
  drag_handle: "拖曳排序",
  edit_pencil: "編輯",
  filter_funnel: "篩選",
  location_pin: "定位圖釘",
  map_pin_count_badge: "地圖點位數",
  map_with_pin: "地圖定位",
  plus: "新增",
  suitcase: "行李箱",
  trash_bin: "刪除",
  bell: "提醒鈴鐺",
  bookmark: "書籤",
  compass: "指南針",
  edit: "編輯",
  heart: "收藏愛心",
  info: "資訊",
  map_layers: "地圖圖層",
  minus: "減少",
  more: "更多",
  navigation_arrow: "導航箭頭",
  refresh: "重新整理",
  settings: "設定",
  sort: "排序",
  star: "星號收藏",
  upload: "上傳",
  user_beanie_boy: "毛帽男孩",
  user_blonde_bun_girl: "金髮包頭女孩",
  user_blonde_overalls_girl: "吊帶褲金髮女孩",
  user_blonde_purple_hoodie_boy: "金髮紫帽踢男孩",
  user_blue_hoodie_boy: "藍帽踢男孩",
  user_brown_glasses_boy: "棕髮眼鏡男孩",
  user_brown_pink_shirt_girl: "棕髮粉衣女孩",
  user_dark_green_jacket_girl: "深綠外套女孩",
  user_gradient_hair_girl: "漸層髮女孩",
  user_green_jacket_boy: "綠外套男孩",
  user_headphones_boy: "耳機男孩",
  user_hoodie_dark_boy: "深色帽踢男孩",
  user_purple_glasses_girl: "紫框眼鏡女孩",
  user_space_buns_girl: "雙丸子頭女孩",
  user_straw_hat_boy: "草帽男孩",
  user_tropical_shirt_boy: "熱帶襯衫男孩",
};

const ITEM_CATEGORY_OVERRIDES = {
  ai_sparkles: "介面",
  chevron_down: "介面",
  chevron_up: "介面",
  link_copy: "介面",
  loading_spinner: "介面",
  memo_note: "介面",
  menu_list: "介面",
  search: "介面",
  share: "介面",
  add_trip_wand: "行程功能",
  checkmark_circle: "行程功能",
  clock: "行程功能",
  time_afternoon: "行程功能",
  time_all_day: "行程功能",
  time_custom: "行程功能",
  time_evening: "行程功能",
  time_forenoon: "行程功能",
  time_morning: "行程功能",
  time_noon: "行程功能",
  bell: "行程功能",
  bookmark: "行程功能",
  info: "行程功能",
  refresh: "行程功能",
  beach_umbrella_palm: "旅遊",
  location_pin: "旅遊",
  map_pin_count_badge: "旅遊",
  map_with_pin: "旅遊",
  compass: "旅遊",
  map_layers: "旅遊",
  navigation_arrow: "旅遊",
  suitcase: "配件",
  chevron_left: "介面",
  chevron_right: "介面",
  download_to_tray: "介面",
  drag_handle: "介面",
  edit_pencil: "介面",
  filter_funnel: "介面",
  plus: "介面",
  trash_bin: "介面",
  edit: "介面",
  heart: "介面",
  minus: "介面",
  more: "介面",
  settings: "介面",
  sort: "介面",
  star: "介面",
  upload: "介面",
  手機: "3C電力",
  行動電源: "3C電力",
  回程提醒事項: "旅遊",
  指南針: "旅遊",
  當地緊急電話: "旅遊",
  緊急聯絡資訊: "旅遊",
  健保卡: "文件",
  駕照: "文件",
  清單表: "行程功能",
  止痛退燒藥: "健康",
  牙刷: "盥洗",
  牙膏: "盥洗",
  隱眼藥水保養液: "盥洗",
  護唇膏: "盥洗",
  運動服: "衣物",
  洗衣袋: "配件",
  塑膠袋: "配件",
  濕衣物塑膠袋: "配件",
  環保購物袋: "配件",
  筆記本與筆: "配件",
  墨鏡: "配件",
};

function getCategoryOrderValue(categoryName) {
  const idx = CATEGORY_ORDER.indexOf(categoryName);
  return idx === -1 ? 999 : idx;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .trim();
}

function getStickyOffsetHeight() {
  const stickySelectors = [".header", ".toolbar", ".categoryNav"];
  let h = 0;
  for (const sel of stickySelectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    if (getComputedStyle(el).position === "sticky") {
      h += el.getBoundingClientRect().height;
    }
  }
  return h;
}

function downloadIcon(url, file) {
  const a = document.createElement("a");
  a.href = url;
  a.download = file;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function App() {
  const [sections, setSections] = useState([]);
  const [query, setQuery] = useState("");
  const [showBackTop, setShowBackTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch("/categories-manifest.json")
      .then((r) => r.json())
      .then((data) => {
        const grouped = new Map();
        for (const section of data.sections || []) {
          for (const item of section.items || []) {
            const key = String(item.file || item.name || "").replace(
              /\.png$/i,
              ""
            );
            const targetCategory =
              ITEM_CATEGORY_OVERRIDES[key] || section.category;
            const displayName = ITEM_NAME_OVERRIDES[key] || item.name;
            if (!grouped.has(targetCategory)) {
              grouped.set(targetCategory, []);
            }
            grouped.get(targetCategory).push({
              ...item,
              name: displayName,
            });
          }
        }

        const sections = Array.from(grouped.entries())
          .map(([category, items]) => ({
            category,
            count: items.length,
            items: [...items].sort((a, b) =>
              String(a.name).localeCompare(String(b.name), "zh-Hant")
            ),
          }))
          .sort((a, b) => {
            const pa = getCategoryOrderValue(a.category);
            const pb = getCategoryOrderValue(b.category);
            if (pa !== pb) return pa - pb;
            return String(a.category).localeCompare(
              String(b.category),
              "zh-Hant"
            );
          });
        setSections(sections);
      });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const filteredSections = useMemo(() => {
    const q = normalizeText(query);
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) => !q || normalizeText(item.name).includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [sections, query]);

  function scrollToCategory(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const y =
      window.scrollY +
      target.getBoundingClientRect().top -
      getStickyOffsetHeight() -
      10;
    window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
  }

  const sectionMotion = isMobile
    ? {
        initial: { opacity: 0, y: 64, scale: 0.95 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -52, scale: 0.96 },
        viewport: { amount: 0.2, once: false },
        transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
      }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        viewport: { amount: 0.22, once: false },
        transition: { duration: 0.32 },
      };

  const cardMotion = isMobile
    ? {
        initial: { opacity: 0, y: 28, scale: 0.9 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.92 },
        viewport: { amount: 0.24, once: false },
        transition: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
      }
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        viewport: { amount: 0.24, once: false },
        transition: { duration: 0.25 },
      };

  return (
    <>
      <div id="app">
        <motion.header
          className="header"
          initial={isMobile ? { opacity: 0, y: -60 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.62 : 0.25, ease: "easeOut" }}
        >
          <div className="pixelDecor" aria-hidden="true">
            <span>✦</span>
            <span>✧</span>
            <span>✦</span>
            <span>✧</span>
          </div>
          <div className="headerMainRow">
            <div className="brandLeft">
              <img
                className="brandLogo"
                src="/logo.png"
                alt="ICON 像素圖示庫"
              />
              <h1 className="fancyTitle srOnly">ICON 像素圖示庫</h1>
            </div>
            <div className="searchCenter">
              <input
                id="searchInput"
                type="text"
                placeholder="搜尋可愛像素圖示..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="headerButtons">
              <a
                className="downloadAll"
                href="/downloads/icons_all.zip"
                download
                data-track="download_all_icons"
                data-track-id="header-download-all-icons"
                data-track-meta='{"location":"header"}'
              >
                下載全部圖示
              </a>
              <a
                className="downloadAll secondary"
                href="/categories-manifest.json"
                download
                data-track="download_category_manifest"
                data-track-id="header-download-category-manifest"
                data-track-meta='{"location":"header"}'
              >
                下載分類清單
              </a>
            </div>
          </div>

          <motion.nav
            className="categoryNav"
            initial={isMobile ? { opacity: 0, y: 34 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: isMobile ? 0.1 : 0,
              duration: isMobile ? 0.58 : 0.2,
              ease: "easeOut",
            }}
          >
            {filteredSections.map((section) => {
              const id = encodeURIComponent(section.category);
              return (
                <a
                  key={section.category}
                  className="categoryAnchor"
                  href={`#${id}`}
                  data-track="navigate_category"
                  data-track-id={`category-nav-${id}`}
                  data-track-meta={JSON.stringify({
                    category: section.category,
                    location: "category_nav",
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToCategory(id);
                  }}
                >
                  {section.category}
                </a>
              );
            })}
          </motion.nav>
        </motion.header>

        <main className="categoriesSection">
          <AnimatePresence mode="popLayout">
            {filteredSections.map((section, sectionIdx) => {
              const id = encodeURIComponent(section.category);
              const showFirstSectionImmediately = sectionIdx === 0;
              return (
                <motion.section
                  key={section.category}
                  id={id}
                  className="categoryBlock"
                  layout
                  initial={
                    showFirstSectionImmediately ? false : sectionMotion.initial
                  }
                  whileInView={
                    showFirstSectionImmediately
                      ? undefined
                      : sectionMotion.whileInView
                  }
                  exit={sectionMotion.exit}
                  viewport={sectionMotion.viewport}
                  transition={sectionMotion.transition}
                >
                  <header className="categoryHeader">
                    <h2 className="categoryTitle">
                      {section.category}（{section.items.length}）
                    </h2>
                    <a
                      className="categoryDownload"
                      href={`/category-downloads/${encodeURIComponent(
                        section.category
                      )}.zip`}
                      download
                      data-track="download_category_zip"
                      data-track-id={`category-download-${id}`}
                      data-track-meta={JSON.stringify({
                        category: section.category,
                        location: "category_section_header",
                      })}
                    >
                      下載此分類 ZIP
                    </a>
                  </header>

                  <div className="iconGrid">
                    <AnimatePresence mode="popLayout">
                      {section.items.map((item, idx) => {
                        const showFirstSectionIconsImmediately = false;
                        return (
                          <motion.article
                            key={`${section.category}-${item.file}`}
                            className="iconCard"
                            layout
                            initial={
                              showFirstSectionIconsImmediately
                                ? false
                                : cardMotion.initial
                            }
                            whileInView={cardMotion.whileInView}
                            exit={cardMotion.exit}
                            viewport={cardMotion.viewport}
                            transition={{
                              ...cardMotion.transition,
                              delay: isMobile
                                ? (showFirstSectionIconsImmediately ? 0 : 0.1) +
                                  (idx % 2) * 0.09
                                : 0,
                            }}
                          >
                            <button
                              className="iconDownloadButton"
                              type="button"
                              data-track="download_single_icon"
                              data-track-id={`icon-download-${item.file}`}
                              data-track-meta={JSON.stringify({
                                category: section.category,
                                iconName: item.name,
                                file: item.file,
                              })}
                              onClick={() => downloadIcon(item.url, item.file)}
                            >
                              <img
                                src={item.url}
                                alt={item.name}
                                loading="lazy"
                              />
                            </button>
                            <div className="name">{item.name}</div>
                          </motion.article>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>
        </main>
      </div>

      <button
        className={`backTopButton ${showBackTop ? "show" : ""}`}
        type="button"
        aria-label="回到頂部"
        data-track="back_to_top"
        data-track-id="floating-back-to-top"
        data-track-meta='{"location":"floating_button"}'
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src={`/categories/${encodeURIComponent(
            "行程功能"
          )}/${encodeURIComponent("chevron_up.png")}`}
          alt="回到頂部"
        />
      </button>
    </>
  );
}
