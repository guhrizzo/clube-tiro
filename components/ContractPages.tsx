import { Children, cloneElement, useLayoutEffect, useState } from "react";
import type { ReactElement, ReactNode, RefObject } from "react";
import styles from "./ContractPages.module.css";

interface ContractPagesProps {
  document: ReactElement<{ children?: ReactNode; className?: string }>;
  exportRef: RefObject<HTMLDivElement>;
}

export default function ContractPages({ document, exportRef }: ContractPagesProps) {
  const [pageStarts, setPageStarts] = useState([0]);

  useLayoutEffect(() => {
    const source = exportRef.current?.firstElementChild;
    if (!source) return;

    const paginate = () => {
      const width = source.getBoundingClientRect().width;
      if (!width) return;

      const sheet = getComputedStyle(source);
      const availableHeight = width * 297 / 210
        - parseFloat(sheet.paddingTop) - parseFloat(sheet.paddingBottom)
        - parseFloat(sheet.borderTopWidth) - parseFloat(sheet.borderBottomWidth);
      const blocks = Array.from(source.children);
      const heights = blocks.map((block) => {
        const style = getComputedStyle(block);
        return block.getBoundingClientRect().height
          + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      });

      const starts = [0];
      let usedHeight = 0;
      for (let index = 0; index < blocks.length; index++) {
        const height = heights[index];
        const nextHeight = blocks[index].tagName === "H2" ? heights[index + 1] ?? 0 : 0;
        if (usedHeight > 0 && usedHeight + height + nextHeight > availableHeight) {
          starts.push(index);
          usedHeight = 0;
        }
        usedHeight += height;
      }

      setPageStarts((previous) =>
        previous.length === starts.length && previous.every((start, index) => start === starts[index])
          ? previous
          : starts
      );
    };

    paginate();
    const observer = new ResizeObserver(paginate);
    observer.observe(source);
    return () => observer.disconnect();
  }, [document, exportRef]);

  const blocks = Children.toArray(document.props.children);

  return (
    <div className="relative">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden">
        <div ref={exportRef}>{document}</div>
      </div>
      <div className={`space-y-6 ${styles.preview}`}>
        {pageStarts.map((start, index) => (
          <section key={start} aria-label={`Página ${index + 1}`}>
            {cloneElement(
              document,
              { className: `${document.props.className} relative flow-root aspect-[210/297] break-words` },
              blocks.slice(start, pageStarts[index + 1]),
              <div
                key="watermark"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-4 place-items-center select-none p-[5%] opacity-10"
              >
                {Array.from({ length: 12 }, (_, position) => (
                  <img
                    key={position}
                    src="/LOGO1.png"
                    alt=""
                    draggable={false}
                    className="w-3/4"
                  />
                ))}
              </div>,
              <span key="page-number" className="absolute inset-x-0 bottom-3 text-center text-[10px] text-gray-500">
                {index + 1} / {pageStarts.length}
              </span>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
