// Import React dependencies.
import React, { useMemo, useState, useEffect } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

import { withHistory } from "slate-history";

// Import the Slate components and React plugin.
import { Slate, withReact } from "slate-react";

import { autoformatRules } from "../utils/autoFormatRules";

import { CodeAlt } from "@styled-icons/boxicons-regular/CodeAlt";
import { CodeBlock } from "@styled-icons/boxicons-regular/CodeBlock";
import { Subscript, Superscript } from "@styled-icons/foundation";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Image,
  Link as LinkIcon,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  // Search,
} from "@styled-icons/material";

import {
  EditablePlugins,
  pipe,
  // decorateSearchHighlight,
  // ToolbarSearchHighlight,
  HeadingToolbar,
  ToolbarElement,
  ToolbarList,
  ToolbarMark,
  MARK_BOLD,
  MARK_ITALIC,
  MARK_UNDERLINE,
  MARK_STRIKETHROUGH,
  MARK_CODE,
  MARK_SUPERSCRIPT,
  MARK_SUBSCRIPT,
  ToolbarAlign,
  ToolbarLink,
  ToolbarImage,
  BalloonToolbar,
  ParagraphPlugin,
  BlockquotePlugin,
  TodoListPlugin,
  HeadingPlugin,
  ImagePlugin,
  LinkPlugin,
  ListPlugin,
  MentionPlugin,
  TablePlugin,
  MediaEmbedPlugin,
  CodeBlockPlugin,
  AlignPlugin,
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  HighlightPlugin,
  // SearchHighlightPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  ResetBlockTypePlugin,
  SoftBreakPlugin,
  ExitBreakPlugin,
  withTable,
  withLink,
  withList,
  withDeserializeHTML,
  withMarks,
  withImageUpload,
  withToggleType,
  withAutoformat,
  withTransforms,
  withNormalizeTypes,
  withTrailingNode,
  withInlineVoid,
} from "@udecode/slate-plugins";

import {
  headingTypes,
  initialValueAutoformat,
  initialValueBasicElements,
  initialValueBasicMarks,
  // initialValueEmbeds,
  initialValueExitBreak,
  initialValueForcedLayout,
  initialValueHighlight,
  initialValueImages,
  initialValueLinks,
  initialValueList,
  initialValueMentions,
  initialValuePasteHtml,
  initialValueSoftBreak,
  initialValueTables,
  options,
  optionsResetBlockTypes,
} from "../utils/initialValues";

const EditorPane = () => {
  const decorate: any = [];
  const onKeyDown: any = [];

  let initialValue: Node[] = [
    ...initialValueForcedLayout,
    ...initialValueBasicMarks,
    ...initialValueHighlight,
    ...initialValueBasicElements,
    ...initialValueList,
    ...initialValueTables,
    ...initialValueLinks,
    ...initialValueMentions,
    ...initialValueImages,
    // ...initialValueEmbeds,
    ...initialValueAutoformat,
    ...initialValueSoftBreak,
    ...initialValueExitBreak,
    ...initialValuePasteHtml,
  ];

  const [value, setValue] = useState(initialValue);

  const plugins: any[] = [];

  useEffect(() => {
    plugins.push(ParagraphPlugin(options));
    plugins.push(BlockquotePlugin(options));
    plugins.push(TodoListPlugin(options));
    plugins.push(HeadingPlugin(options));
    plugins.push(ImagePlugin(options));
    plugins.push(LinkPlugin(options));
    plugins.push(ListPlugin(options));
    plugins.push(MentionPlugin(options));
    plugins.push(TablePlugin(options));
    plugins.push(MediaEmbedPlugin(options));
    plugins.push(CodeBlockPlugin(options));
    plugins.push(AlignPlugin(options));
    plugins.push(BoldPlugin(options));
    plugins.push(CodePlugin(options));
    plugins.push(ItalicPlugin(options));
    plugins.push(HighlightPlugin(options));
    // plugins.push(SearchHighlightPlugin(options));
    plugins.push(UnderlinePlugin(options));
    plugins.push(StrikethroughPlugin(options));
    plugins.push(SubscriptPlugin(options));
    plugins.push(SuperscriptPlugin(options));
    plugins.push(ResetBlockTypePlugin(optionsResetBlockTypes));
    plugins.push(
      SoftBreakPlugin({
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: [
                options.code_block.type,
                options.blockquote.type,
                options.td.type,
              ],
            },
          },
        ],
      })
    );
    plugins.push(
      ExitBreakPlugin({
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            hotkey: "mod+shift+enter",
            before: true,
          },
          {
            hotkey: "enter",
            query: {
              start: true,
              end: true,
              allow: headingTypes,
            },
          },
        ],
      })
    );
  }, []);

  const withPlugins = [
    withReact,
    withHistory,
    withTable(options),
    withLink(),
    withList(options),
    withDeserializeHTML({ plugins }),
    withMarks(),
    withImageUpload(),
    withToggleType({ defaultType: options.p.type }),
    withAutoformat({ rules: autoformatRules }),
    withTransforms(),
    withNormalizeTypes({
      rules: [{ path: [0, 0], strictType: options.h1.type }],
    }),
    withTrailingNode({ type: options.p.type, level: 1 }),
    withInlineVoid({ plugins }),
  ] as const;

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  // const [search, setSearchHighlight] = useState("");

  // decorate.push(decorateSearchHighlight({ search }));

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      {/* <ToolbarSearchHighlight icon={Search} setSearch={setSearchHighlight} /> */}
      <HeadingToolbar styles={{ root: { flexWrap: "wrap" } }}>
        {/* Elements */}
        <ToolbarElement type={options.h1.type} icon={<LooksOne />} />
        <ToolbarElement type={options.h2.type} icon={<LooksTwo />} />
        <ToolbarElement type={options.h3.type} icon={<Looks3 />} />
        <ToolbarElement type={options.h4.type} icon={<Looks4 />} />
        <ToolbarElement type={options.h5.type} icon={<Looks5 />} />
        <ToolbarElement type={options.h6.type} icon={<Looks6 />} />
        <ToolbarList
          {...options}
          typeList={options.ul.type}
          icon={<FormatListBulleted />}
        />
        <ToolbarList
          {...options}
          typeList={options.ol.type}
          icon={<FormatListNumbered />}
        />
        <ToolbarElement type={options.blockquote.type} icon={<FormatQuote />} />
        <ToolbarElement type={options.code_block.type} icon={<CodeBlock />} />

        {/* Marks */}
        <ToolbarMark type={MARK_BOLD} icon={<FormatBold />} />
        <ToolbarMark type={MARK_ITALIC} icon={<FormatItalic />} />
        <ToolbarMark type={MARK_UNDERLINE} icon={<FormatUnderlined />} />
        <ToolbarMark type={MARK_STRIKETHROUGH} icon={<FormatStrikethrough />} />
        <ToolbarMark type={MARK_CODE} icon={<CodeAlt />} />
        <ToolbarMark
          type={MARK_SUPERSCRIPT}
          clear={MARK_SUBSCRIPT}
          icon={<Superscript />}
        />
        <ToolbarMark
          type={MARK_SUBSCRIPT}
          clear={MARK_SUPERSCRIPT}
          icon={<Subscript />}
        />

        <ToolbarAlign icon={<FormatAlignLeft />} />
        <ToolbarAlign
          type={options.align_center.type}
          icon={<FormatAlignCenter />}
        />
        <ToolbarAlign
          type={options.align_right.type}
          icon={<FormatAlignRight />}
        />
        <ToolbarLink {...options} icon={<LinkIcon />} />
        <ToolbarImage {...options} icon={<Image />} />
      </HeadingToolbar>
      <BalloonToolbar arrow>
        <ToolbarMark
          reversed
          type={MARK_BOLD}
          icon={<FormatBold />}
          tooltip={{ content: "Bold (⌘B)" }}
        />
        <ToolbarMark
          reversed
          type={MARK_ITALIC}
          icon={<FormatItalic />}
          tooltip={{ content: "Italic (⌘I)" }}
        />
        <ToolbarMark
          reversed
          type={MARK_UNDERLINE}
          icon={<FormatUnderlined />}
          tooltip={{ content: "Underline (⌘U)" }}
        />
      </BalloonToolbar>
      <EditablePlugins
        plugins={plugins}
        decorate={decorate}
        // decorateDeps={[search]}
        // renderLeafDeps={[search]}
        onKeyDown={onKeyDown}
        placeholder="Enter some plain text..."
      />
    </Slate>
  );
};

export default EditorPane;
