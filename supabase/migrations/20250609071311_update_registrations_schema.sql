-- 1. 기존 'name' 컬럼의 이름을 새로운 'student_name'으로 변경합니다.
--    이전에 이미 이름이 변경되었다면 이 쿼리는 오류를 발생시킬 수 있으나, 무시하고 진행해도 괜찮습니다.
--    오류를 방지하고 싶다면, 먼저 컬럼 존재 여부를 확인해야 합니다.
DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='registrations' AND column_name='name') THEN
    ALTER TABLE public.registrations RENAME COLUMN name TO student_name;
  END IF;
END $$;

-- 2. 새로운 스키마에 필요한 컬럼들을 추가합니다.
--    IF NOT EXISTS를 사용하여 이미 존재하는 컬럼은 건너뛰므로 여러 번 실행해도 안전합니다.
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS student_name_english text,
  ADD COLUMN IF NOT EXISTS student_phone text,
  ADD COLUMN IF NOT EXISTS student_email text,
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS gender text,
  ADD COLUMN IF NOT EXISTS school text,
  ADD COLUMN IF NOT EXISTS grade text,
  ADD COLUMN IF NOT EXISTS parent_name text,
  ADD COLUMN IF NOT EXISTS parent_phone text,
  ADD COLUMN IF NOT EXISTS parent_email text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS church text,
  ADD COLUMN IF NOT EXISTS special_needs text;

-- 3. status와 payment_status 컬럼의 기본값을 설정합니다. (기존 데이터에는 영향을 주지 않습니다)
ALTER TABLE public.registrations
  ALTER COLUMN status SET DEFAULT 'unpaid'::text,
  ALTER COLUMN payment_status SET DEFAULT 'pending'::text;

-- 4. id 컬럼의 타입을 uuid로 변경하고 기본값을 설정합니다.
--    주의: 이 작업은 테이블에 데이터가 많을 경우 시간이 걸릴 수 있습니다.
--    기존 id가 bigint이므로 uuid로 직접 변환이 불가하여, 임시 컬럼을 사용한 복잡한 과정이 필요합니다.
--    하지만 테스트 데이터라면, 아래의 간단한 방법이 더 효율적일 수 있습니다. (기존 id 데이터는 잃게 됨)
--    ALTER TABLE public.registrations DROP COLUMN id;
--    ALTER TABLE public.registrations ADD COLUMN id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY;
--    위 방법 대신, ALTER를 사용한 좀 더 안전한 접근을 시도합니다. 타입 캐스팅이 실패할 수 있습니다.
ALTER TABLE public.registrations
  ALTER COLUMN id SET DATA TYPE uuid USING (uuid_generate_v4()),
  ALTER COLUMN id SET DEFAULT gen_random_uuid();


-- 5. created_at 컬럼의 타임존 기본값을 설정합니다.
ALTER TABLE public.registrations
  ALTER COLUMN created_at SET DEFAULT timezone('Asia/Seoul'::text, now());

-- 6. 결제 시스템에 필수적인 amount, order_id 컬럼을 추가합니다.
ALTER TABLE public.registrations
  ADD COLUMN IF NOT EXISTS amount integer,
  ADD COLUMN IF NOT EXISTS order_id text UNIQUE;